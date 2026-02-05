import type { CoreRequest, Result } from "./core.js";
import { Response } from "./response.js";

/**
 * `Request` is the typed request object passed to Zapix handlers and middleware.
 *
 * @template TBody - The expected shape of the request body (default: generic object)
 * @template TExtra - Additional custom fields injected per adapter or middleware
 *
 * Extends CoreRequest while:
 *  - Allowing a strongly typed `body`
 *  - Supporting extra properties injected dynamically (e.g., auth user, context)
 */
export type Request<
	TBody extends object = Record<string, unknown>,
	TExtra extends object = Record<string, unknown>,
> = Omit<CoreRequest, "body"> & {
	/** The parsed request body; optional for GET/DELETE requests */
	body?: TBody;
} & TExtra;

/**
 * `Controller` defines the signature for a route handler in Zapix.
 *
 * @template TBody - The expected request body type
 * @template TExtra - Extra properties added to the request
 *
 * Handlers receive:
 *  - `req` → strongly typed Request object (with optional body and extra fields)
 *  - `res` → helper object with methods to construct CoreResponses (res.json(), res.text(), res.empty())
 *
 * Returns:
 *  - A Promise resolving to any value (usually a CoreResponse via `res` helpers)
 */
export type Controller<
	TBody extends object = Record<string, unknown>,
	TExtra extends object = Record<string, unknown>,
> = (req: Request<TBody, TExtra>, res: Response) => Promise<Result>;

/**
 * Middleware defines a function that runs before or after route handlers.
 * It can modify the request, short-circuit a response, or call `next()` to continue.
 *
 * @template TBody - The expected request body type
 * @template TExtra - Extra fields injected into the request (e.g., auth info)
 *
 * Middleware receives:
 *  - `req` → strongly typed Request
 *  - `res` → response helpers (res.json, res.text, res.empty)
 *  - `next` → function to call to continue to the next middleware/handler
 *
 * Middleware should return:
 *  - `Promise<CoreResponse | void>` if it ends the chain or `await next()` if it continues
 */
export type Middleware<
	TBody extends object = Record<string, unknown>,
	TExtra extends object = Record<string, unknown>,
> = (
	req: Request<TBody, TExtra>,
	res: Response,
	next: () => Promise<Result | void>,
) => Promise<Result | void>;
