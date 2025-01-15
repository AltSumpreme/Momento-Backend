import { z, createRoute } from "@hono/zod-openapi";

export const root = createRoute({
  method: "get",
  path: "/",
  request: {},
  responses: {
    200: {
      description: "Public route",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            message: z.string().openapi({ example: "Public route" }),
          }),
        },
      },
    },
  },
});
