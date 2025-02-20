import { z, createRoute } from "@hono/zod-openapi";

export const getBookings = createRoute({
  method: "get",
  path: "/",
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
      description: "Bookings retrieved successfully",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              id: z.string().uuid(),
              userId: z.string().uuid(),
              eventId: z.string().uuid(),
              user: z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                role: z.enum(["USER", "ADMIN", "ORGANIZER"]),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime(),
              }),
              event: z.object({
                id: z.string().uuid(),
                name: z.string(),
                description: z.string(),
                location: z.string(),
                date: z.string().datetime(),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime(),
              }),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            })
          ),
        },
      },
    },
    404: {
      description: "Bookings not found",
    },
  },
});

export const getBooking = createRoute({
  method: "get",
  path: "/{eventId}",
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
      description: "Booking details retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().uuid(),
            userId: z.string().uuid(),
            eventId: z.string().uuid(),
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              role: z.enum(["USER", "ADMIN", "ORGANIZER"]),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            }),
            event: z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              location: z.string(),
              date: z.string().datetime(),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            }),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    404: {
      description: "Booking not found",
    },
  },
});

export const createBooking = createRoute({
  method: "post",
  path: "/{eventId}",
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
      description: "Booking created successfully",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().uuid(),
            userId: z.string().uuid(),
            eventId: z.string().uuid(),
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              role: z.enum(["USER", "ADMIN", "ORGANIZER"]),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            }),
            event: z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              location: z.string(),
              date: z.string().datetime(),
              createdAt: z.string().datetime(),
              updatedAt: z.string().datetime(),
            }),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    404: {
      description: "Booking not found",
    },
  },
});

export const deleteBooking = createRoute({
  method: "delete",
  path: "/{eventId}",
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
      description: "Booking deleted successfully",
    },
    404: {
      description: "Booking not found",
    },
  },
});
