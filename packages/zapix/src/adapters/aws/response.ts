import { buildApiResponse } from "@/core/response";

export function formatAwsResponse<T = unknown>(
  payload: T,
  statusCode?: number,
  headers: Record<string, string> = {},
) {
  const isError =
    payload instanceof Error ||
    typeof payload === "string" ||
    (statusCode !== undefined && statusCode >= 400);

  const finalStatus = statusCode ?? (isError ? 500 : 200);

  return buildApiResponse(finalStatus, payload, headers);
}

// // Default headers for all responses
// const DEFAULT_HEADERS: Record<string, string> = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
// };

// /**
//  * Generic function to format any HTTP response
//  *
//  * @param statusCode - HTTP status code
//  * @param message - Human-readable message
//  * @param data - Optional payload to include
//  * @param headers - Optional headers to merge with default headers
//  * @returns Formatted AWS Lambda response
//  */
// const formatResponse = <T = unknown>(
//   statusCode: number,
//   message: string,
//   data?: T,
//   headers: Record<string, any> = {},
// ) => ({
//   statusCode,
//   headers: { ...DEFAULT_HEADERS, ...headers },
//   body: JSON.stringify(data ?? { message }),
// });

// /**
//  * Format error payload into structured object
//  *
//  * @param error - Error object/string/array to format
//  * @returns Structured error response
//  */
// const formatErrorResponse = (error: any) => {
//   const isDebugMode = process.env.DEBUG === "true" || true;

//   let message = "Internal Server Error";
//   let details: unknown = error;

//   console.log(error, "whati is error");

//   // Validation errors from class-validator or similar
//   if (Array.isArray(error) && error[0]?.constraints) {
//     const constraints = error[0].constraints;
//     const firstKey = Object.keys(constraints)[0] as string;
//     message = constraints[firstKey] ?? "Validation error";
//     details = constraints;
//   }
//   // Generic validation errors (e.g., Mongoose, Joi)
//   else if (error?.name === "ValidationError" && error.errors) {
//     const firstKey = Object.keys(error.errors)[0] as string;
//     message = error.errors[firstKey]?.message ?? "Validation error";
//     details = error.errors;
//   }
//   // Standard JS Error
//   else if (error instanceof Error) {
//     message = error.message;
//     details = error.stack;
//   }
//   // String error
//   else if (typeof error === "string") {
//     message = error;
//   }
//   // Fallback for objects
//   else if (typeof error === "object") {
//     try {
//       message = JSON.stringify(error);
//     } catch {
//       message = "Unknown error";
//     }
//   }

//   // Hide details in non-debug mode
//   if (!isDebugMode) {
//     details = null;
//     message = "Internal Server Error";
//   }

//   return { success: false, error: details };
// };

// /**
//  * Unified AWS Lambda response helper
//  *
//  * Determines if payload is an error or success and formats accordingly
//  *
//  * @param payload - Success data or error
//  * @param statusCode - Optional HTTP status code (defaults: 200 success, 500 error)
//  * @param headers - Optional headers to merge with default
//  * @returns AWS Lambda compatible response
//  */
// export const formatAwsResponse = <T = unknown>(
//   payload: T,
//   statusCode?: number,
//   headers: Record<string, any> = {},
// ) => {
//   const isError =
//     typeof payload === "string" ||
//     payload instanceof Error ||
//     (Array.isArray(payload) && payload[0]?.constraints) ||
//     (statusCode !== undefined && statusCode >= 400);

//   const finalStatus = statusCode ?? (isError ? 500 : 200);

//   if (isError) {
//     const errorResponse = formatErrorResponse(payload);
//     console.log(errorResponse, "errorResponse");

//     return formatResponse(finalStatus, "error", errorResponse, headers);
//   }

//   return formatResponse(finalStatus, "Success", payload, headers);
// };
