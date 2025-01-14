import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerSpec } from "../utils/swaggeSpec.js";
import { authRouter } from "./routes/auth.js";
import { publicRouter } from "./routes/public.js";
import { secureRouter } from "./routes/secure.js";

const app = new OpenAPIHono();

app.get("/docs", swaggerUI({ url: "/swagger.json" }));
app.get("/swagger.json", (c) => {
  return c.json(swaggerSpec);
});

app.get("/", (c) => c.text("Hello Hono!"));
app.route("/auth", authRouter);
app.route("/public", publicRouter);
app.route("/secure", secureRouter);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
