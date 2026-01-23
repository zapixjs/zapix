import { Response } from "./http";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

export interface CoreRequest<TBody = unknown> {
  /** HTTP method (GET, POST, etc.) */
  method: HttpMethod | string;

  /** Normalized URL path (no domain, no query string) */
  path: string;

  /** String URL path including (domain, query string) */
  pathString: string;

  /** Raw query parameters */
  query?: Record<string, string | string[] | undefined>;

  /** Normalized headers (lowercased keys) */
  headers: Record<string, string | undefined>;

  /** Parsed request body */
  body: TBody;

  /** Raw body string (before parsing) */
  rawBody?: string;

  /** Route params (filled by router, not adapter) */
  params?: Record<string, string | undefined>;

  /** raw metadata (adapter-specific, optional) */
  raw?: {
    name: "aws-lambda" | "edge" | "node" | string;
    event?: unknown;
    context?: unknown;
  };
}

export interface CoreResponse {
  /** HTTP status code */
  status: number;

  /** Response body (will be serialized by adapter) */
  body?: unknown;

  /** Response headers */
  headers?: Record<string, string>;

  /** Cookies (adapter decides how to serialize) */
  cookies?: string[];

  /** Whether body is already serialized */
  isBase64Encoded?: boolean;
}

/**
 * CoreController represents a route handler in Zapix.
 *
 * @param req - The core request object
 * @param res - Response helpers (res.json, res.text, res.empty)
 * @returns Promise resolving to any value (usually a CoreResponse via res)
 */
export type CoreController = (req: CoreRequest, res: Response) => Promise<any>;

/**
 * CoreMiddleware represents a middleware function in Zapix.
 *
 * @param req - The core request object
 * @param res - Response helpers
 * @param next - Call to continue to the next middleware or handler
 * @returns Promise resolving to CoreResponse if short-circuited, or void to continue
 */
export type CoreMiddleware = (
  req: CoreRequest,
  res: Response,
  next: () => Promise<void>,
) => Promise<CoreResponse | void>;
