import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "hono";
import { middleware } from "../../lib/middleware.js";
import { root } from "./route.js";

const secureRouter = new OpenAPIHono();

secureRouter.use(middleware);

secureRouter.openapi(root, (c: Context) => {
  const user = c.get("user");
  return c.json({
    success: true,
    message: "Secure route",
    user,
  });
});

export { secureRouter };
