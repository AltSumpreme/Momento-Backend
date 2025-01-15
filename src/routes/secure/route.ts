import { z, createRoute } from "@hono/zod-openapi";

export const root = createRoute({
  method: "get",
  path: "/",
  request: {},
  responses: {
    200: {
      description: "Secure route",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            message: z.string().openapi({ example: "Secure route" }),
            user: z.any().openapi({ example: { id: "123", name: "John Doe" } }),
          }),
        },
      },
    },
  },
});
