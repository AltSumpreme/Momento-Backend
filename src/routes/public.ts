import { Hono } from "hono";

const publicRouter = new Hono();

publicRouter.get("/", (c) => c.text("Public route"));

export { publicRouter };
