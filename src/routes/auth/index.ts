import { OpenAPIHono } from "@hono/zod-openapi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login, signup } from "./route.js";
import prisma from "../../lib/prisma.js";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

const authRouter = new OpenAPIHono();

authRouter.openapi(signup, async (c) => {
  const { name, email, password } = await c.req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ success: false, error: "User already exists" }, 409);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return c.json({ success: true, message: "Signup successful", token }, 201);
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

authRouter.openapi(login, async (c) => {
  const { email, password } = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json(
        { success: false, error: "Invalid email or password" },
        404
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return c.json(
        { success: false, error: "Invalid email or password" },
        403
      );
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return c.json({ success: true, message: "Login successful", token }, 200);
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

export { authRouter };
