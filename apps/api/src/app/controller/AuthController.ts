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

class AuthController extends BaseController {
  constructor() {
    super();
    this.basePath = '/auth';
    this.routes = [
      {
        path: '/signin',
        method: 'post',
        handler: this.signin,
        middleware: [],
      },
      {
        path: '/signup',
        method: 'post',
        handler: this.signup,
        middleware: [],
      },
    ];
    this.setRoutes();
  }
  private async signin(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      console.log(user);
      //check if user is not exist
      if (!user) {
        return response_not_found(res, 'Account is not registered');
      }
      // compare password

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return response_bad_request(res, 'Password is wrong');
      }
      // generate token
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign({ username }, secretKey);

      return response_success(res, { token, user });
    } catch (error) {
      return response_server_error(res, error.message);
    }
  }
  private async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, displayName, email, password } = req.body;
      const avatar = 'gs://nx-app-bcf16.appspot.com/images/avatar.png';
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
        avatar,
      });
      const saved = await user.save();
      return response_success(res, saved);
    } catch (error) {
      return response_server_error(res, error.message);
    }
  }
  private async updateProfile(req, res) {}
  private async forgotPassword(req, res) {}
  private async sendOTP(req, res) {}
}
export default AuthController;
