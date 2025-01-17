import { z } from "@hono/zod-openapi";

export const bookingSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  userId: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  eventId: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  bookedAt: z.string().datetime().openapi({ example: "2023-01-01T00:00:00Z" }),
});
