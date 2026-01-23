import {
  CoreController,
  CoreMiddleware,
  CoreRequest,
  CoreResponse,
  Response,
} from "./types";

type RouteChainItem = CoreController | CoreMiddleware;

interface Route {
  method: string;
  path: string;
  handlers: RouteChainItem[];
}

export class Router {
  private routes: Route[] = [];
  private globalMiddlewares: RouteChainItem[] = [];
  private fallbackHandlers: RouteChainItem[] = [];
  private errorHandler?: (err: any) => Promise<CoreResponse>;

  get(path: string, ...handlers: RouteChainItem[]) {
    this.add("GET", path, handlers);
  }

  post(path: string, ...handlers: RouteChainItem[]) {
    this.add("POST", path, handlers);
  }

  put(path: string, ...handlers: RouteChainItem[]) {
    this.add("PUT", path, handlers);
  }

  patch(path: string, ...handlers: RouteChainItem[]) {
    this.add("PATCH", path, handlers);
  }

  delete(path: string, ...handlers: RouteChainItem[]) {
    this.add("DELETE", path, handlers);
  }

  all(...handlers: RouteChainItem[]) {
    this.fallbackHandlers = handlers;
  }

  use(...middlewares: RouteChainItem[]) {
    this.globalMiddlewares.push(...middlewares);
  }

  useError(handler: (err: any) => Promise<CoreResponse>) {
    this.errorHandler = handler;
  }

  private add(method: string, path: string, handlers: RouteChainItem[]) {
    this.routes.push({ method, path, handlers });
  }

  async handle(req: CoreRequest, res: Response): Promise<CoreResponse> {
    const route = this.routes.find(
      (r) => r.method === req.method && r.path === req.path,
    );

    const handlers = [
      ...this.globalMiddlewares,
      ...(route ? route.handlers : this.fallbackHandlers),
    ];

    if (!handlers.length) {
      return res.json({ message: "Route not found RES" }, 404);
    }

    let index = 0;

    const run = async (err?: any) => {
      if (err) {
        if (this.errorHandler) return this.errorHandler(err);
        return { status: 500, body: err };
      }

      const handler = handlers[index++];
      if (!handler) return;

      const next = (error?: any) => run(error);
      return handler(req, res, next);
    };

    return (await run()) ?? res.json({ message: "No response returned" }, 500);
  }
}
