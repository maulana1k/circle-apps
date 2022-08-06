import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import BaseController from './BaseController';
import User from '../models/User';
import {
  response_bad_request,
  response_not_found,
  response_server_error,
  response_success,
} from '../utils/responses';
import { IUser, UserWithToken } from '@circle-app/api-interfaces';
import { body } from 'express-validator';

class AuthController extends BaseController {
  constructor() {
    super();
    this.basePath = '/auth';
    /**
     * local middleware
     */
    this.router.use((req, res, next) => {
      next();
    });
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
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      //check if user is not exist
      if (!user) {
        return response_not_found(res, 'Account is not registered');
      }
      // compare password
      console.log(user.password);

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return response_bad_request(res, 'Password is wrong');
      }
      // generate token
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign({ username }, secretKey);
      return response_success<UserWithToken>(res, { token, user });
    } catch (error) {
      return response_server_error(res, error.message);
    }
  }
  private async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, displayName, email, password } = req.body;
      //check if username is unique
      const isUnique = await User.findOne({ username });
      if (isUnique) {
        return response_bad_request(res, 'Username is already used');
      }
      //check if user is exist
      const isExist = await User.findOne({ email });
      if (isExist) {
        return response_bad_request(res, 'Email is already used');
      }
      // hash current password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create and store user to db
      const user = new User({
        username,
        displayName,
        email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign({ username }, secretKey);
      return response_success<UserWithToken>(res, { token, user: savedUser });
    } catch (error) {
      return response_server_error(res, error.message);
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
      return response_server_error(res, error.message);
    }
  }
  private async forgotPassword(req, res) {}
  private async sendOTP(req, res) {}
}
export default AuthController;
