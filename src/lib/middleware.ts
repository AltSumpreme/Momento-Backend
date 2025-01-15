import type { Context } from "hono";
import jwt from "jsonwebtoken";

export const middleware = async (c: Context, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return c.json({ success: false, message: "No token provided" }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    c.set("user", decoded);
    await next();
  } catch {
    return c.json({ success: false, message: "Invalid token" }, 401);
  }
};
