import { Hono } from "hono";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";

const authRouter = new Hono();
const JWT_SECRET: string = process.env.JWT_SECRET || "";
const prisma = new PrismaClient();

authRouter.post("/signup", async (c) => {
  const { name, email, password } = await c.req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return c.json({ message: "Signup successful" });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "An unknown error occurred" }, 400);
  }
});

authRouter.post("/login", async (c) => {
  const { email, password }: { email: string; password: string } =
    await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 400);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return c.json({ error: "Invalid email or password" }, 400);
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return c.json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "An unknown error occurred" }, 400);
  }
});

authRouter.post("/logout", (c) => {
  // Endpoint for the sake of it. Client side should remove the token from local storage or cookies
  return c.json({ message: "Logout successful" });
});

export { authRouter };
