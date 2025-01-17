import { OpenAPIHono } from "@hono/zod-openapi";
import { v4 } from "uuid";
import { sign } from "hono/jwt";
import { login, signup } from "./route.js";
import prisma from "../../lib/prisma.js";
import { checkPassword, hashPassword } from "../../util/hashPassword.js";

const authRouter = new OpenAPIHono();

authRouter.openapi(login, async (ctx) => {
  const { email, password } = await ctx.req.json();

  if (!process.env.JWT_SECRET) {
    return ctx.text("JWT secret not set", 500);
  }

  try {
    const existingUser = await prisma.auth.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!existingUser) {
      return ctx.text("User not found", 404);
    }

    const truePassword = await checkPassword(password, existingUser?.password);

    if (truePassword) {
      const token = await sign(
        {
          id: existingUser.user?.id,
          role: existingUser.user?.role,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1h
        },
        process.env.JWT_SECRET
      );

      return ctx.json({ token }, 200);
    } else {
      return ctx.text("Invalid email or password", 403);
    }
  } catch (error) {
    return ctx.text(
      error instanceof Error ? error.message : "An unknown error occurred",
      500
    );
  }
});
authRouter.openapi(signup, async (ctx) => {
  const { name, email, password } = await ctx.req.json();
  if (!process.env.JWT_SECRET) {
    return ctx.text("JWT secret not set", 500);
  }
  try {
    const hashedpassword = await hashPassword(password);

    const user = await prisma.auth.findUnique({
      where: { email },
    });

    if (user) {
      return ctx.text(
        "User with this email already exists. Please login instead.",
        409
      );
    }
    const newUser = await prisma.$transaction(async (tx) => {
      const auth = await tx.auth.create({
        data: {
          id: v4(),
          email,
          password: hashedpassword,
          user: {
            create: {
              id: v4(),
              name,
            },
          },
        },
        include: { user: true },
      });

      return auth;
    });

    const token = await sign(
      {
        userId: newUser.user?.id,
        role: newUser.user?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1h
      },
      process.env.JWT_SECRET
    );

    return ctx.json({ message: "Signup successful", token: token }, 201);
  } catch (error) {
    return ctx.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

export default authRouter;
