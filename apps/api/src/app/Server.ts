import express, { Application, RequestHandler } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import BaseController, { Controller } from './controller/BaseController';
class Server {
  private port: number | string;
  public app: Application;
  private dbUri: string;
  constructor(port: number | string, app: Application) {
    this.port = port;
    this.app = app;
  }
  public setDatabaseUri(uri: string) {
    this.dbUri = uri;
  }
  async run() {
    await mongoose
      .connect(this.dbUri)
      .then(() => console.log('DB connected...'));
    return this.app.listen(this.port, () =>
      console.log('⚡ Server running on port', this.port)
    );
    // .on('request', console.info);
    // .on('error', console.error);
  }
  public loadGlobalMiddleware(middlewares: RequestHandler[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  public loadController(controllers: Array<BaseController>): void {
    controllers.forEach((controller) => {
      controller.connectRouter(this.app);
    });
    // this.app.use('/', (req, res) => {
    //   res.send('React api v0.1');
    // });
  }
}

export default Server;
