import { Router } from "@/core/router";
import { CoreRequest, CoreResponse, Response } from "@/core/types";
import { tryParseJson } from "@/helpers";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { formatAwsResponse } from "./response";

export const awsResponseMethods: Response = {
  json(
    body: unknown,
    status = 200,
    headers: Record<string, string> = {},
  ): CoreResponse {
    const res = formatAwsResponse(body, status, headers);

    return {
      status: res.statusCode,
      body: res.body,
      headers: {
        "content-type": "application/json",
        ...res.headers,
      },
    };
  },

  text(
    body: string,
    status = 200,
    headers: Record<string, string> = {},
  ): CoreResponse {
    return {
      status,
      body,
      headers: {
        "content-type": "text/plain",
        ...headers,
      },
    };
  },

  empty(status = 204): CoreResponse {
    return {
      status,
      body: null,
    };
  },
};

export function awsLambdaAdapter(router: Router) {
  return async (
    event: APIGatewayProxyEventV2,
    context: Context,
  ): Promise<APIGatewayProxyResultV2> => {
    const req: CoreRequest = {
      method: event.requestContext.http.method,
      path: event.requestContext.http.path,
      pathString: event.routeKey,
      query: event.queryStringParameters,
      headers: event.headers ?? {},
      body: tryParseJson(event.body),
      rawBody: event.body,
      params: event.pathParameters,
      raw: {
        name: "aws-lambda",
        event: event,
        context: context,
      },
    };

    const res = await router.handle(req, awsResponseMethods);

    return {
      statusCode: res.status,
      headers: res.headers,
      body: JSON.stringify(res.body),
    };
  };
}
