import { OpenAPIHono } from "@hono/zod-openapi";
import { getCurrentUser } from "../../lib/middleware.js";
import prisma from "../../lib/prisma.js";
import {
  createEvent,
  getEvent,
  getEventbyId,
  updateEvent,
  deleteEvent,
} from "./route.js";

const eventRouter = new OpenAPIHono();

//POST /events - Create a new event
eventRouter.openapi(createEvent, async (ctx) => {
  const { title, description, eventDateTime, location } = ctx.req.valid("json");
  const id = getCurrentUser(ctx).id;
  try {
    await prisma.event.create({
      data: {
        title,
        description,
        eventDateTime: new Date(eventDateTime),
        location,
        userId: id,
      },
    });
    return ctx.json({ message: "Event created successfully" }, 201);
  } catch (error) {
    return ctx.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

//GET /events - Get all events
eventRouter.openapi(getEvent, async (ctx) => {
  try {
    const page = parseInt(ctx.req.query("page") || "1", 10);
    const limit = parseInt(ctx.req.query("limit") || "10", 10);
    const currentPage = isNaN(page) || page < 1 ? 1 : page;
    const perPage = isNaN(limit) || limit < -1 || limit > 10 ? 10 : limit;

    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        eventDateTime: true,
        location: true,
        userId: true,
      },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });
    const formattedEvents = events.map((event) => ({
      ...event,
      eventDateTime: event.eventDateTime.toISOString(),
    }));
    return ctx.json(formattedEvents, 200);
  } catch (error) {
    return ctx.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});
//GET /events/{id} - Get event by id
eventRouter.openapi(getEventbyId, async (ctx) => {
  const { id } = ctx.req.param();
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        eventDateTime: true,
        location: true,
        userId: true,
      },
    });
    if (!event) {
      return ctx.json({ error: "Event not found" }, 404);
    }

    return ctx.json(event, 200);
  } catch (error) {
    return ctx.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

//PUT /events - Update an event
eventRouter.openapi(updateEvent, async (ctx) => {
  try {
    const userId = getCurrentUser(ctx).id;
    if (!userId) {
      return ctx.json({ error: "User is not logged in" }, 401);
    }
    const { id } = ctx.req.param();
    const { title, description, eventDateTime, location } =
      await ctx.req.valid("json");
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });
    if (!event) {
      return ctx.json({ error: "Event not found" }, 404);
    }

    if (userId === event.userId) {
      await prisma.event.update({
        where: { id },
        data: {
          title,
          description,
          eventDateTime: new Date(eventDateTime),
          location,
        },
      });
      return ctx.json({ message: "Event has been updated successfully" }, 200);
    } else {
      return ctx.json(
        { error: "You are not authorized to update this event" },
        403
      );
    }
  } catch (error) {
    return ctx.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

//DELETE /events - Delete an event
eventRouter.openapi(deleteEvent, async (ctx) => {
  try {
    const userId = getCurrentUser(ctx).id;
    if (!userId) {
      return ctx.json({ error: "User is not logged in" }, 401);
    }
    const { id } = await ctx.req.param();
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return ctx.json({ error: "Event not found" }, 404);
    }
    if (userId === event.userId) {
      await prisma.event.delete({
        where: { id },
      });
      return ctx.json({ message: "Event Sucessfully deleted" }, 200);
    } else {
      return ctx.json(
        { error: "User is not authorized to delete this event" },
        403
      );
    }
  } catch (error) {
    return ctx.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      500
    );
  }
});

export default eventRouter;
