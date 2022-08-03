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
  protected setRoutes() {
    this.routes.forEach((route) => {
      try {
        route.middleware.forEach((mw) =>
          this.router[route.method](route.path, mw)
        );
        this.router[route.method](route.path, route.handler);
      } catch (error) {}
    });
  }
  public connectRouter(app: Application) {
    app.use(this.basePath, this.router);
  }
}

export default BaseController;
