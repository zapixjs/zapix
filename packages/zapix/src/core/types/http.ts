import type { CoreRequest, CoreResponse } from "./core";

/**
 * Response defines the helper methods available in the `res` object
 * passed to handlers and middleware in Zapix.
 *
 * These methods produce a standardized CoreResponse object that is
 * platform-agnostic, adapter-neutral, and ready to be translated by the
 * adapter (e.g., AWS Lambda, Node, Edge).
 */
export type Response = {
  /**
   * Sends a JSON response.
   *
   * @param body - The payload to send as JSON. Can be any serializable value.
   * @param status - Optional HTTP status code (default: 200)
   * @param headers - Optional additional headers to include in the response
   * @returns A CoreResponse object with `application/json` content type
   */
  json: (
    body: unknown,
    status?: number,
    headers?: Record<string, string>,
  ) => CoreResponse;

  /**
   * Sends a plain text response.
   *
   * @param body - The text string to send
   * @param status - Optional HTTP status code (default: 200)
   * @param headers - Optional additional headers to include in the response
   * @returns A CoreResponse object with `text/plain` content type
   */
  text: (
    body: string,
    status?: number,
    headers?: Record<string, string>,
  ) => CoreResponse;

  /**
   * Sends an empty response.
   *
   * @param status - Optional HTTP status code (default: 204 No Content)
   * @returns A CoreResponse object with `null` body
   */
  empty: (status?: number) => CoreResponse;
};

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
> = (req: Request<TBody, TExtra>, res: Response) => Promise<unknown>;

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
  next: () => Promise<CoreResponse | void>,
) => Promise<CoreResponse | void>;
