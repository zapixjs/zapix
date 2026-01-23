import { describe, expect, it } from "vitest";
import { Router } from "../src/core/router";
import { awsResponseMethods as ResponseMethods } from "./../src/adapters/aws/request";

describe("Router", () => {
  it("should return 404 when route not found", async () => {
    const router = new Router();
    const req = {
      method: "GET",
      path: "/unknown",
      pathString: "/unknown",
      headers: {},
      body: undefined,
      query: {},
    } as any;
    const res = ResponseMethods;

    const result = await router.handle(req, res as any);

    console.log(result, "resultresultresult");

    expect(result.status).toBe(404);
    expect(result.headers).toEqual({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
    expect(JSON.parse(result.body as string)).toEqual({
      success: false,
      message: '{"message":"Route not found"}',
      error: {
        message: "Route not found",
      },
    });
    
    // expect(result.body).toEqual({
    //   status: 404,
    //   body: '{"success":false,"message":"{\\"message\\":\\"Route not found\\"}","error":{"message":"Route not found"}}',
    //   headers: {
    //     "content-type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // });
  });

  // it("should handle a GET route correctly", async () => {
  //   const router = new Router();
  //   const req = {
  //     method: "GET",
  //     path: "/test",
  //     headers: {},
  //     body: undefined,
  //     query: {},
  //   } as any;
  //   const res = ResponseMethods;

  //   router.get("/test", async (req, res) => res.json({ ok: true }));

  //   const result = await router.handle(req, res as any);

  //   expect(result.status).toBe(200);
  //   expect(result.body).toEqual({ ok: true });
  // });

  // it("should run global middleware before route handler", async () => {
  //   const router = new Router();
  //   const req = {
  //     method: "GET",
  //     path: "/mw",
  //     headers: {},
  //     body: undefined,
  //     query: {},
  //   } as any;
  //   const res = ResponseMethods;

  //   const middleware = vi.fn(async (req: any, res: any, next: any) => next());
  //   router.use(middleware);

  //   router.get("/mw", async (req, res) => res.json({ done: true }));

  //   const result = await router.handle(req, res as any);

  //   expect(middleware).toHaveBeenCalled();
  //   expect(result.status).toBe(200);
  //   expect(result.body).toEqual({ done: true });
  // });

  // it("should call fallback handlers if route not found", async () => {
  //   const router = new Router();
  //   const req = {
  //     method: "GET",
  //     path: "/fallback",
  //     headers: {},
  //     body: undefined,
  //     query: {},
  //   } as any;
  //   const res = ResponseMethods;

  //   router.all(async (req, res) => res.json({ fallback: true }));

  //   const result = await router.handle(req, res as any);

  //   expect(result.status).toBe(200);
  //   expect(result.body).toEqual({ fallback: true });
  // });

  // it("should call errorHandler on thrown error", async () => {
  //   const router = new Router();
  //   const req = {
  //     method: "GET",
  //     path: "/error",
  //     headers: {},
  //     body: undefined,
  //     query: {},
  //   } as any;
  //   const res = ResponseMethods;

  //   router.get("/error", async () => {
  //     throw new Error("Boom");
  //   });

  //   router.useError(async (err) => res.json({ caught: err.message }, 500));

  //   const result = await router.handle(req, res as any);

  //   expect(result.status).toBe(500);
  //   expect(result.body).toEqual({ caught: "Boom" });
  // });
});
