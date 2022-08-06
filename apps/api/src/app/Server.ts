import { Application, RequestHandler } from 'express';
import mongoose from 'mongoose';
import BaseController from './controller/BaseController';

class Server {
  private port: number | string;
  public app: Application;
  private dbUri: string;
  private apiPrefix: string = '/api';
  constructor(port: number | string, app: Application) {
    this.port = port;
    this.app = app;
  }
  public setDatabaseUri(uri: string) {
    this.dbUri = uri;
  }
  async run() {
    try {
      await mongoose
        .connect(this.dbUri)
        .then(() => console.log('__________ DB connected ________'));
      return this.app.listen(this.port, () =>
        console.log('⚡ Server running on port', this.port)
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  public loadGlobalMiddleware(middlewares: RequestHandler[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  public loadController(controllers: Array<BaseController>): void {
    controllers.forEach((controller) => {
      controller.connectRouter(this.app, this.apiPrefix);
    });
    // this.app.use('/', (req, res) => {
    //   res.send('React api v0.1');
    // });
  }
}

export default Server;
