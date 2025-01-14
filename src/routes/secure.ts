import { Hono } from "hono";
import jwt from "jsonwebtoken";
import type { Context } from "hono";

const JWT_SECRET = process.env.JWT_SECRET || "";

const middleware = async (c: Context, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");

  const token = authHeader?.split(" ")[1];
  if (!token) {
    return c.json(
      {
        success: false,
        message: "Invalid token or no token provided",
      },
      401
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    c.set("user", decoded);
    await next();
  } catch {
    return c.json(
      {
        success: false,
        message: "Invalid token",
      },
      401
    );
  }
};

const secureRouter = new Hono();

secureRouter.use("/*", middleware);

secureRouter.get("/", (c: Context) => {
  const user = c.get("user");
  return c.json({
    success: true,
    message: "Secure route",
    user,
  });
});

export { secureRouter };
