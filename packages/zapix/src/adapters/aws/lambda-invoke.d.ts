import type { Result } from "@/core/types";
/**
 * Invoke another AWS Lambda programmatically using Zapix request format
 *
 * @param functionName - Name or ARN of the target Lambda
 * @param route - Zapix route object { method, path, pathString }
 * @param body - Request body to send
 * @param headers - Optional HTTP headers
 * @returns Result from the invoked Lambda
 */
export function invokeLambda<TBody = unknown>(
  functionName: string,
  route: {
    method: string;
    path: string;
    pathString: string;
  },
  body?: TBody,
  headers?: Record<string, string>,
): Promise<Result>;
//# sourceMappingURL=lambda-invoke.d.ts.map
