import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import authRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import bookRouter from "./routes/book/index.js";
import eventRouter from "./routes/events/index.js";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();

// Middleware for logging in dev env
app.use("*", async (c, next) => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  if (methods.includes(c.req.method)) {
    console.log(`${c.req.method} ${new URL(c.req.url).pathname}`);
  }
  await next();
});

app.use("*", cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || [] }));

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.get("/", (c) => c.text("Hello Hono!"));

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Momento API Documentation",
  },
});

app.get("/docs", swaggerUI({ url: "/openapi" }));

app.route("/auth", authRouter);

// ----- Place the protected routes after this -----
app.use("*", jwt({ secret: process.env.JWT_SECRET! }));
// -------------------------------------------------

app.route("/user", userRouter);
app.route("/book", bookRouter);
app.route("/event", eventRouter);

const port = 8080;
console.log(`Server: http://localhost:${port}/`);

serve({
  fetch: app.fetch,
  port,
});
