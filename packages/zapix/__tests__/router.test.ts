import { describe, expect, it } from "vitest";
import { ZapixResponseCore } from "../src/core/response";
import { Router } from "../src/core/router";

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
    const res = new ZapixResponseCore();

    const result = await router.handle(req, res as any);

    expect(result).toEqual({
      status: 404,
      body: { message: "Route not found" },
      headers: { "Content-Type": "application/json" },
    });
  });
});
