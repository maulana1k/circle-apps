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

const app = express();
const port = process.env.PORT;
const dbURI = process.env.DB_URI;
const server = new Server(port, app);
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
 * always load global middlewares before load any controllers
 */
server.loadGlobalMiddleware([
  cors(corsOptions),
  helmet(),
  morgan('dev'),
  bodyParser.urlencoded({ extended: true }),
  express.static(path.join(__dirname, '/assets')),
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
 *  STARTS THE ENGINE
 */
server.run();
