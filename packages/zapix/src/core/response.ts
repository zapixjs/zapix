/* -------------------------------------------------------------------------- */
/*                               Default Headers                               */
/* -------------------------------------------------------------------------- */
import {
  ApiHeaders,
  ApiResponseBody,
  AwsApiResponse,
  ErrorResponse,
} from "./types";

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
} as const satisfies ApiHeaders;

/* -------------------------------------------------------------------------- */
/*                               Type Guards                                   */
/* -------------------------------------------------------------------------- */

function isValidationConstraintError(
  error: unknown,
): error is Array<{ constraints: Record<string, string> }> {
  return (
    Array.isArray(error) &&
    typeof error[0]?.constraints === "object" &&
    error[0].constraints !== null
  );
}

function isNamedValidationError(
  error: unknown,
): error is { name: "ValidationError"; errors?: unknown } {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name: string }).name === "ValidationError"
  );
}

/* -------------------------------------------------------------------------- */
/*                            Error Normalization                               */
/* -------------------------------------------------------------------------- */

function normalizeError(error: unknown): ErrorResponse {
  if (isValidationConstraintError(error)) {
    const constraints = error[0]?.constraints || {};
    const firstMessage = Object.values(constraints)[0];

    return {
      success: false,
      message: firstMessage ?? "Validation error",
      details: constraints,
    };
  }

  if (isNamedValidationError(error)) {
    return {
      success: false,
      message: "Validation error",
      details: error.errors,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
      details: error.stack,
    };
  }

  if (typeof error === "string") {
    return {
      success: false,
      message: error,
    };
  }

  return {
    success: false,
    message: "Internal Server Error",
    details: error,
  };
}

/* -------------------------------------------------------------------------- */
/*                           Response Builder                                  */
/* -------------------------------------------------------------------------- */

export function buildApiResponse<T>(
  statusCode: number,
  payload: T | unknown,
  headers?: ApiHeaders,
): AwsApiResponse {
  const isSuccess = statusCode >= 200 && statusCode < 300;

  const body: ApiResponseBody<T> = isSuccess
    ? {
        success: true,
        message: "Success",
        data: payload as T,
      }
    : normalizeError(payload);

  return {
    statusCode,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    body: JSON.stringify(body),
  };
}
