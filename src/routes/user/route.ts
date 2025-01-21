import { z, createRoute } from "@hono/zod-openapi";

export const getUser = createRoute({
  method: "get",
  path: "/profile",
  security: [{ Bearer: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            role: z.string(),
            exp: z.number(),
          }),
        },
      },
    },
  },

  responses: {
    200: {
      description: "User details retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
            role: z.enum(["USER", "ADMIN", "ORGAINZER"]),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    404: {
      description: "User not found",
    },
  },
});
