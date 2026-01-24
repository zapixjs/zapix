import { ZapixResponseCore } from "@/core/response";
import { Router } from "@/core/router";
import { Request } from "@/core/types";
import { tryParseJson } from "@/helpers";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

const response = new ZapixResponseCore();

export function awsLambdaAdapter(router: Router) {
  return async (
    event: APIGatewayProxyEventV2,
    context: Context,
  ): Promise<APIGatewayProxyResultV2> => {
    const request: Request = {
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

    const res = await router.handle(request, response);

    return {
      statusCode: res.status,
      headers: res.headers,
      body: JSON.stringify(res.body),
    };
  };
}
