import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { authRouter } from "./routes/auth/index.js";
import { publicRouter } from "./routes/public/index.js";
import { secureRouter } from "./routes/secure/index.js";

const app = new OpenAPIHono();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Momento API Documentation",
  },
});

app.get("/docs", swaggerUI({ url: "/openapi" }));

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
