import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import Server from './app/Server';
import AuthController from './app/controller/AuthController';
import path from 'path';
import TweetController from './app/controller/TweetController';
import bodyParser from 'body-parser';
import UsersController from './app/controller/UsersController';
import * as dotenv from 'dotenv'
/**
 * Call dotenv to load environtment variable from .env file
 */
dotenv.config();

const app = express();
const port = process.env.NX_PORT;
const dbURI = process.env.NX_DB_URI;
const server = new Server(port, app);
const CLIENT_PATH = path.join(__dirname,'..' ,'/react');
const ASSETS_PATH = path.join(__dirname, '/assets');
/**
 * CORS configuration
 */
const corsOptions = {
  origin: '*',
  method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
};
/**
 * set mongodb uri
 */
server.setDatabaseUri(dbURI);
/**
 * Set frontend build path to index.html (if any)
 */
server.setClientPath(path.join(CLIENT_PATH,'index.html'));
/**
 * always load global middlewares before load any controllers
 */
server.loadGlobalMiddleware([
  cors(corsOptions),
  // helmet(),
  morgan('dev'),
  bodyParser.urlencoded({ extended: true }),
  express.static(ASSETS_PATH),
  express.static(CLIENT_PATH),
  express.json(),
]);
/**
 * load all controllers instance
 */
server.loadController([
  new AuthController(),
  new TweetController(),
  new UsersController(),
]);
/**
 * export app for testing usage
 */
export default server.app;
/**
 *  ⚡⚡⚡ RUN THE SERVER ⚡⚡⚡
 */
server.run();
