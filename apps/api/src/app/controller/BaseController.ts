import { Application, NextFunction, Request, Response, Router } from 'express';

export type Methods = 'get' | 'post' | 'put' | 'delete';

export interface Middleware {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface Route {
  path: string;
  method: string;
  handler: (req: Request, res: Response) => any | Promise<any>;
  middleware: Array<Middleware>;
}

export interface Controller {
  router: Router;
  basePath: string;
  routes: Array<Route>;
  setRoutes: () => void;
}

abstract class BaseController {
  protected router: Router = Router();
  protected basePath: string;
  protected routes: Array<Route>;
  public connectRouter(app: Application, prefix: string) {
    app.use(prefix + this.basePath, this.router);
  }
}

export default BaseController;
