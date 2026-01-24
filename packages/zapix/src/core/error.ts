export const ZapixErrorCodes = {
  // 4xx – Client Errors
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "The request is invalid",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Authentication required or failed",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You do not have permission to access this resource",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "The requested resource was not found",
  },
  CONFLICT: {
    code: "CONFLICT",
    message: "The request could not be completed due to a conflict",
  },
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    message: "One or more validation errors occurred",
  },

  // 5xx – Server Errors
  INTERNAL_ERROR: {
    code: "INTERNAL_ERROR",
    message: "An internal server error occurred",
  },
  SERVICE_UNAVAILABLE: {
    code: "SERVICE_UNAVAILABLE",
    message: "The service is temporarily unavailable",
  },
  TIMEOUT: {
    code: "TIMEOUT",
    message: "The request timed out",
  },
} as const;

export type ZapixErrorCode = keyof typeof ZapixErrorCodes;

export class ZapixError extends Error {
  public code: ZapixErrorCode | string;
  public details?: unknown;

  /**
   * Create a new ZapixError
   *
   * A custom error class for the Zapix framework that extends the native `Error`.
   * Provides a standardized way to handle API errors with:
   *   - `code`: a machine-readable error code (from ZapixErrorCodes or custom)
   *   - `details`: optional extra information (e.g., validation errors or metadata)
   *
   * Example:
   *   throw new ZapixError("NotFound", "Resource not found", { resourceId: 123 });
   *
   * @param code - The error code (standard ZapixErrorCode key or custom string)
   * @param message - Human-readable error message
   * @param details - Optional additional data about the error
   */
  constructor(
    code: ZapixErrorCode | string,
    message: string,
    details?: unknown,
  ) {
    super(message); // call native Error constructor
    this.code = code;
    this.details = details;

    // Maintain proper stack trace for V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZapixError);
    }
  }
}
