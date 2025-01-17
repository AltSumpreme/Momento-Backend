import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import authRouter from "./routes/auth/index.js";
import { publicRouter } from "./routes/public/index.js";
import { secureRouter } from "./routes/secure/index.js";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.route("/auth", authRouter);

app.get("/", (c) => c.text("Hello Hono!"));

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Momento API Documentation",
  },
});

app.get("/docs", swaggerUI({ url: "/openapi" }));

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET not set");
}

app.use("*", (c, next) => {
  const corsMiddleware = cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  });
  return corsMiddleware(c, next);
});

app.use(jwt({ secret: secret }));

app.route("/public", publicRouter);
app.route("/secure", secureRouter);

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
