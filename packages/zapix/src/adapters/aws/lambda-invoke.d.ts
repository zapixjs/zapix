import type { CoreResponse } from "@/core/types";
/**
 * Invoke another AWS Lambda programmatically using Zapix request format
 *
 * @param functionName - Name or ARN of the target Lambda
 * @param route - Zapix route object { method, path, pathString }
 * @param body - Request body to send
 * @param headers - Optional HTTP headers
 * @returns CoreResponse from the invoked Lambda
 */
export declare function invokeLambda<TBody = unknown>(functionName: string, route: {
    method: string;
    path: string;
    pathString: string;
}, body?: TBody, headers?: Record<string, string>): Promise<CoreResponse>;
//# sourceMappingURL=lambda-invoke.d.ts.map