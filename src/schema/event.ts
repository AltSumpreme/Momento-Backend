import { z } from "@hono/zod-openapi";

import { bookingSchema } from "./booking.js";

export const eventSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  title: z.string().openapi({ example: "Tech Conference 2024" }),
  description: z
    .string()
    .optional()
    .openapi({ example: "An amazing tech conference" }),
  time: z.string().datetime().openapi({ example: "2024-01-01T10:00:00Z" }),
  location: z.string().openapi({ example: "123 Conference Center, New York" }),
  createdById: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  bookings: z.array(bookingSchema),
  createdAt: z.string().datetime().openapi({ example: "2024-01-01T00:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2024-01-01T00:00:00Z" }),
});
