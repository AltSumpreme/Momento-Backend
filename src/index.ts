import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRouter } from "./routes/auth.js";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));
app.route("/auth", authRouter);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
