import { OpenAPIHono } from "@hono/zod-openapi";
import { root } from "./route.js";

const publicRouter = new OpenAPIHono();

publicRouter.openapi(root, (c) =>
  c.json({
    success: true,
    message: "Public route",
  })
);

export { publicRouter };
