import { v4 as uuidv4 } from "uuid";
import type { Middleware } from "../types/index.js";

/**
 * Configuration for the trace middleware
 */
export interface TraceMiddlewareConfig {
	/** Enable/disable the middleware (default: true) */
	enabled?: boolean;

	/** Name of the header where requestId will be attached (default: "X-Request-ID") */
	headerName?: string;

	/** Include requestId in the response body (default: false) */
	includeInBody?: boolean;

	/** Custom generator for requestId (default: UUID v4 with "req_" prefix) */
	generator?: () => string;
}

/** Default configuration values */
const DEFAULT_CONFIG: Required<TraceMiddlewareConfig> = {
	enabled: true,
	headerName: "X-Request-ID",
	includeInBody: false,
	generator: () => `req_${uuidv4()}`,
};

/**
 * Middleware that attaches a requestId to each request and optionally to the response.
 * Useful for tracing, logging, and debugging requests across your application.
 *
 * @param config - Optional configuration overrides
 */
export function traceMiddleware(config: TraceMiddlewareConfig = {}): Middleware {
	const finalConfig: Required<TraceMiddlewareConfig> = {
		...DEFAULT_CONFIG,
		...config,
	};

	return (req, res, next) => {
		if (!finalConfig.enabled) return next();

		// Generate a unique request ID
		const requestId = finalConfig.generator();

		// Attach to request for internal tracing
		req.requestId = requestId;

		// Attach to response headers
		res.set(finalConfig.headerName, requestId);

		// Optionally attach requestId to the response body
		if (finalConfig.includeInBody) {
			const originalFinalize = res["finalize"].bind(res);
			res["finalize"] = (body: unknown) => originalFinalize({ ...(body ?? {}), requestId });
		}

		return next();
	};
}
