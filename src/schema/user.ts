import { z } from "@hono/zod-openapi";
import { Role } from "@prisma/client";
import { eventSchema } from "./event.js";
import { bookingSchema } from "./booking.js";

export const userSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  name: z.string().openapi({ example: "John Doe" }),
  role: z.nativeEnum(Role).openapi({ example: "USER" }),
  createdAt: z.string().datetime().openapi({ example: "2023-01-01T00:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2023-01-01T00:00:00Z" }),
  authid: z
    .string()
    .uuid()
    .openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  createdEvents: z.array(eventSchema),
  bookings: z.array(bookingSchema),
});
