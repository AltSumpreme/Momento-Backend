import { z, createRoute } from "@hono/zod-openapi";

export const login = createRoute({
  method: "post",
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z
              .string()
              .email()
              .openapi({ example: "example@example.com" }),
            password: z.string().min(4).openapi({ example: "password" }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "User logged in successfully",
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string().openapi({ example: "Login successful" }),
              token: z.string().openapi({
                example:
                  "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczNTE0MDk3NiwiaWF0IjoxNzM1MTQwOTc2fQ",
              }),
            })
            .openapi("SuccessResponse"),
        },
      },
    },
    403: {
      description: "Invalid password",
    },
    404: {
      description: "User not found",
    },
    500: {
      description: "JWT secret not set",
    },
  },
});

export const signup = createRoute({
  method: "post",
  path: "/signup",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().openapi({ example: "Example Name" }),
            email: z
              .string()
              .email()
              .openapi({ example: "example@example.com" }),
            password: z.string().min(4).openapi({ example: "password" }),
          }),
        },
      },
    },
  },

  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string().openapi({ example: "Signup successful" }),
              token: z.string().openapi({
                example:
                  "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczNTE0MDk3NiwiaWF0IjoxNzM1MTQwOTc2fQ",
              }),
            })
            .openapi("SuccessResponse"),
        },
      },
    },
    409: {
      description: "User already exists",
    },
    500: {
      description: "JWT secret not set",
    },
  },
});
