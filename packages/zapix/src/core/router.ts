import {
	Controller,
	Middleware,
	Request,
	Response,
	Result,
} from "./types/index.js";

type RouteChainItem = Controller | Middleware;
interface Route {
	method: string;
	path: string;
	handlers: RouteChainItem[];
}

type ErrorHandler = (
	err: unknown,
	req: Request,
	res: Response,
) => Promise<Result> | Result;

export class Router {
	private routes: Route[] = [];
	private globalMiddlewares: RouteChainItem[] = [];
	private fallbackHandlers: RouteChainItem[] = [];
	private errorHandler?: ErrorHandler;

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

	onError(handler: ErrorHandler) {
		this.errorHandler = handler;
	}

	private async handleError(
		err: unknown,
		req: Request,
		res: Response,
	): Promise<Result> {
		if (this.errorHandler) {
			return await this.errorHandler(err, req, res);
		}

		// default behavior (same spirit as Express)
		if (err instanceof Error) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(500).json({ error: "Internal Server Error" });
	}

	private add(method: string, path: string, handlers: RouteChainItem[]) {
		this.routes.push({ method, path, handlers });
	}

	protected async handle(req: Request, res: Response): Promise<Result> {
		const route = this.routes.find(
			(r) => r.method === req.method && r.path === req.path,
		);

		const handlers = [
			...this.globalMiddlewares,
			...(route ? route.handlers : this.fallbackHandlers),
		];

		if (!handlers.length) {
			return res.status(404).json({ message: "Route not found" });
		}

		let index = 0;

		const run = async (err?: unknown): Promise<Result | void> => {
			if (err) {
				return this.handleError(err, req, res);
			}

			const handler = handlers[index++];
			if (!handler) return;

			try {
				return await handler(
					req,
					res,
					(nextErr?: unknown): Promise<void | Result> => run(nextErr),
				);
			} catch (error) {
				return this.handleError(error, req, res);
			}
		};

		return (
			(await run()) ?? res.status(500).json({ message: "No response returned" })
		);
	}
}
