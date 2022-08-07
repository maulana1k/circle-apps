import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import BaseController from './BaseController';
import User from '../models/User';
import { IUser, UserWithToken } from '@circle-app/api-interfaces';
import { body } from 'express-validator';

class AuthController extends BaseController {
  constructor() {
    super();
    this.basePath = '/auth';
    /**
     * local middleware
     */
    /**
     * Route handler mapping
     */
    this.router.post('/signin', this.signin);
    this.router.post(
      '/signup',
      [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
      ],
      this.signup
    );
  }
  private async signin(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);

      const user = await User.findOne({ $or: [{ username }, { email }] });
      //check if user is not exist
      if (!user) {
        res.status(400).send('Account is not registered');
        return;
      }
      // compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).send('Password wrong');
        return;
      }
      // generate token
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign({ email }, secretKey);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, birth } = req.body;
      console.log(req.body);

      //check if username is unique
      const isUnique = await User.findOne({ username });
      if (isUnique) {
        res.status(400).send('Username is already used');
        return;
      }
      //check if user is exist
      const isExist = await User.findOne({ email });
      if (isExist) {
        res.status(400).send('Email is already used');
        return;
      }
      // hash current password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create and store user to db
      const user = new User({
        username,
        displayName: username,
        birth,
        email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign({ username }, secretKey);
      res.json({ token, user: savedUser });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async updateProfile(req: Request, res: Response) {
    try {
      const { username, displayName, email, password, bio }: IUser = req.body;
      const user = await User.findOneAndUpdate(
        { username },
        {
          $set: {
            username,
            displayName,
            email,
            password,
            bio,
          },
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async forgotPassword(req, res) {}
  private async sendOTP(req, res) {}
}
export default AuthController;
