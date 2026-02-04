import type { Middleware } from "zapix";

export const authorizationMiddleware: Middleware = async (req, res, next) => {
  // Simple idea about middleware: treat any Authorization header as logged in.
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};
