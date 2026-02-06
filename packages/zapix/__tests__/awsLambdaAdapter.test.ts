import type { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { traceMiddleware } from "../src";
import { awsLambdaAdapter } from "../src/adapters/aws";
import { Router } from "../src/core/router";
import type { NextFn, Request, Response } from "../src/core/types";

interface ICreateMockAPIGatewayEvent {
	method?: string;
	path?: string;
	routeKey?: string;
	query?: Record<string, string>;
	headers?: Record<string, string>;
	body?: unknown;
	pathParameters?: Record<string, string>;
	cookies?: string[];
	stageVariables?: Record<string, string>;
}

const createMockAPIGatewayEvent = (params: ICreateMockAPIGatewayEvent) => {
	const {
		method = "GET",
		path = "/",
		routeKey,
		query = {},
		headers = {},
		body,
		pathParameters = {},
		cookies = [],
		stageVariables = {},
	} = params;
	const resolvedRouteKey = routeKey ?? `${method.toUpperCase()} ${path}`;

	const event: APIGatewayProxyEventV2 = {
		version: "2.0",
		routeKey: resolvedRouteKey,
		rawPath: path,
		rawQueryString: new URLSearchParams(query).toString(),
		cookies,
		headers: {
			"content-type": "application/json",
			...headers,
		},
		queryStringParameters: query,
		pathParameters,
		requestContext: {
			accountId: "123456789012",
			apiId: "api-id",
			domainName: "example.com",
			domainPrefix: "example",
			stage: "$default",
			requestId: "req-123",
			routeKey: resolvedRouteKey,
			time: new Date().toISOString(),
			timeEpoch: Date.now(),
			http: {
				method: method.toUpperCase(),
				path,
				protocol: "HTTP/1.1",
				sourceIp: "127.0.0.1",
				userAgent: "Vitest-Test",
			},
		} as any,
		body: body !== undefined ? JSON.stringify(body) : undefined,
		isBase64Encoded: false,
		stageVariables,
	};

	return event;
};

const mockHandler = vi.fn(async (req: any, res: Response) => {
	return res.status(200).json({ ok: true });
});

const mockErrorHandler = vi.fn(
	async (err: unknown, req: Request, res: Response) =>
		res.status(500).json({ error: "Custom Error" }),
);

describe("Router", () => {
	let router: Router;
	const context: Context = {} as any;

	beforeEach(() => {
		router = new Router();
		vi.clearAllMocks();
	});

	it("should handle GET request", async () => {
		router.get("/users", mockHandler);
		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/users",
		});

		const result: any = await lambdaHandler(event, context);

		expect(result.statusCode).toBe(200);
		expect(JSON.parse(result.body)).toEqual({ ok: true });
		expect(mockHandler).toHaveBeenCalled();
	});

	it("should handle POST request", async () => {
		router.post("/users", mockHandler);
		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "POST",
			path: "/users",
			body: { name: "John" },
		});

		const result: any = await lambdaHandler(event, context);

		expect(result.statusCode).toBe(200);
		expect(JSON.parse(result.body)).toEqual({ ok: true });
		expect(mockHandler).toHaveBeenCalled();
	});

	it("should handle global middleware", async () => {
		const middleware = vi.fn(async (req, res, next) => next());
		const traceMiddlewareFn = vi.fn(traceMiddleware());

		router.use(middleware);
		router.use(traceMiddlewareFn);

		router.get("/users", mockHandler);
		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/users",
		});

		const result: any = await lambdaHandler(event, context);

		expect(middleware).toHaveBeenCalled();
		expect(traceMiddlewareFn).toHaveBeenCalled();

		expect(mockHandler).toHaveBeenCalled();
		expect(result.headers).toHaveProperty("X-Request-ID");
		expect(result.statusCode).toBe(200);
	});

	it("should fallback to 'all' handler if route not found", async () => {
		const fallback = vi.fn(async (req, res) => res.json({ fallback: true }));
		router.all(fallback);
		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/unknown",
		});

		const result: any = await lambdaHandler(event, context);

		expect(fallback).toHaveBeenCalled();
		expect(JSON.parse(result.body)).toEqual({ fallback: true });
	});

	it("should return 404 if route not found and no fallback", async () => {
		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/notfound",
		});

		const result: any = await lambdaHandler(event, context);

		expect(result.statusCode).toBe(404);
		expect(JSON.parse(result.body)).toEqual({ message: "Route not found" });
	});

	it("should handle errors thrown in route with default handler", async () => {
		router.get("/error", async () => {
			throw new Error("Something went wrong");
		});

		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/error",
		});

		const result: any = await lambdaHandler(event, context);

		expect(result.statusCode).toBe(500);
		expect(JSON.parse(result.body)).toEqual({
			error: "Something went wrong",
		});
	});

	it("should use custom onError handler", async () => {
		router.get("/error", async () => {
			throw new Error("Boom");
		});

		router.onError(mockErrorHandler);

		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/error",
		});

		const result: any = await lambdaHandler(event, context);

		expect(mockErrorHandler).toHaveBeenCalled();
		expect(result.statusCode).toBe(500);
		expect(JSON.parse(result.body)).toEqual({ error: "Custom Error" });
	});

	it("should propagate error from next(err) in middleware", async () => {
		const middleware = async (req: Request, res: Response, next: NextFn) =>
			next(new Error("Middleware Error"));
		router.use(middleware);

		router.get("/test", mockHandler);

		const lambdaHandler = awsLambdaAdapter(router);

		const event = createMockAPIGatewayEvent({
			method: "GET",
			path: "/test",
		});

		const result: any = await lambdaHandler(event, context);

		expect(result.statusCode).toBe(500);
		expect(JSON.parse(result.body)).toEqual({ error: "Middleware Error" });
	});
});
