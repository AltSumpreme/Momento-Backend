import { z, createRoute } from "@hono/zod-openapi";

// Create Event Route
export const createEvent = createRoute({
  method: "post",
  path: "/events",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().openapi({
              description: "Title of the event",
              example: "Tech Meetup 2024",
            }),
            description: z.string().optional().nullable().openapi({
              description: "Event details",
              example: "A meetup for developers",
            }),
            eventDateTime: z
              .string()
              .refine((time) => !isNaN(Date.parse(time)), {
                message: "Invalid time format",
              })
              .openapi({
                description: "Date and time of the event in ISO format",
                example: "2024-01-01T10:00:00Z",
              }),
            location: z.string().openapi({
              description: "Location of the event",
              example: "New York City",
            }),
            userId: z.string().uuid().openapi({
              description: "ID of the user creating the event",
              example: "123e4567-e89b-12d3-a456-426614174000",
            }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Event created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Event created successfully" }),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({ example: "An unknown error occurred" }),
          }),
        },
      },
    },
  },
});

export const getEvent = createRoute({
  method: "get",
  path: "/events",
  responses: {
    200: {
      description: "Events fetched successfully",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string().optional().nullable(),
              eventDateTime: z.string().datetime(),
              location: z.string(),
              userId: z.string().uuid(),
            })
          ),
        },
      },
    },
    500: {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

export const getEventbyId = createRoute({
  method: "get",
  path: "/events/{id}",
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        description: "Unique event ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      description: "Event fetched successfully",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().uuid().openapi({
              description: "Unique event ID",
              example: "123e4567-e89b-12d3-a456-426614174000",
            }),
            title: z.string().openapi({
              description: "Title of the event",
              example: "Tech Meetup 2024",
            }),
            description: z.string().optional().nullable().openapi({
              description: "Event details",
              example: "A meetup for developers",
            }),
            eventDateTime: z.string().datetime().openapi({
              description: "Date and time of the event in ISO format",
              example: "2024-01-01T10:00:00Z",
            }),
            location: z.string().openapi({
              description: "Location of the event",
              example: "New York City",
            }),
            userId: z.string().uuid().openapi({
              description: "ID of the user creating the event",
              example: "123e4567-e89b-12d3-a456-426614174000",
            }),
          }),
        },
      },
    },
    404: {
      description: "Event not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({ example: "Event not found" }),
          }),
        },
      },
    },
    500: {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "An error occurred while fetching the event",
            }),
          }),
        },
      },
    },
  },
});

export const updateEvent = createRoute({
  method: "put",
  path: "/events/{id}",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().openapi({
              description: "Unique event ID",
              example: "123e4567-e89b-12d3-a456-426614174000",
            }),
            title: z.string().openapi({
              description: "Title of the event",
              example: "Tech Meetup 2024",
            }),
            description: z.string().optional().nullable().openapi({
              description: "Event details",
              example: "A meetup for developers",
            }),
            eventDateTime: z
              .string()
              .refine((time) => !isNaN(Date.parse(time)), {
                message: "Invalid time format",
              })
              .openapi({
                description: "Date and time of the event in ISO format",
                example: "2024-01-01T10:00:00Z",
              }),
            location: z.string().openapi({
              description: "Location of the event",
              example: "New York City",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Event updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Event updated successfully" }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized. User is not logged in.",
      content: {
        "application/json": {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: "Unauthorized.User is not logged in." }),
          }),
        },
      },
    },
    403: {
      description: "You are not authorized to update this event",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "You are not authorized to update this event",
            }),
          }),
        },
      },
    },
    404: {
      description: "Event not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});
// Delete Event Route
export const deleteEvent = createRoute({
  method: "delete",
  path: "/events/{id}",
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        description: "Unique event ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      description: "Event deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Event deleted successfully" }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized. User is not logged in.",
      content: {
        "application/json": {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: "Unauthorized.User is not logged in." }),
          }),
        },
      },
    },
    403: {
      description: "You are not authorized to delete this event",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "You are not authorized to delete this event",
            }),
          }),
        },
      },
    },
    404: {
      description: "Event not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({ example: "Event not found" }),
          }),
        },
      },
    },
    500: {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({
              example: "An error occurred while deleting the event",
            }),
          }),
        },
      },
    },
  },
});
