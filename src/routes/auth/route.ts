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
              success: z.boolean().openapi({ example: true }),
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
      content: {
        "application/json": {
          schema: z
            .object({
              success: z.boolean().openapi({ example: false }),
              error: z
                .string()
                .openapi({ example: "Invalid email or password" }),
            })
            .openapi("ErrorResponse"),
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: z
            .object({
              success: z.boolean().openapi({ example: false }),
              error: z.string().openapi({ example: "User not found" }),
            })
            .openapi("ErrorResponse"),
        },
      },
    },
    500: {
      description: "JWT secret not set",
      content: {
        "application/json": {
          schema: z
            .object({
              success: z.boolean().openapi({ example: false }),
              error: z.string().openapi({ example: "JWT secret not set" }),
            })
            .openapi("ErrorResponse"),
        },
      },
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
              success: z.boolean().openapi({ example: true }),
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
      content: {
        "application/json": {
          schema: z
            .object({
              success: z.boolean().openapi({ example: false }),
              error: z.string().openapi({ example: "User already exists" }),
            })
            .openapi("ErrorResponse"),
        },
      },
    },
    500: {
      description: "JWT secret not set",
      content: {
        "application/json": {
          schema: z
            .object({
              success: z.boolean().openapi({ example: false }),
              error: z.string().openapi({ example: "JWT secret not set" }),
            })
            .openapi("ErrorResponse"),
        },
      },
    },
  },
});
