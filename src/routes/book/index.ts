import { OpenAPIHono } from "@hono/zod-openapi";
import prisma from "../../lib/prisma.js";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
} from "./route.js";

const bookRouter = new OpenAPIHono();

// GET info about a specific booking
bookRouter.openapi(getBooking, async (ctx) => {
  const { id } = await ctx.get("jwtPayload");
  const { eventId } = ctx.req.param();

  try {
    const booking = await prisma.booking.findUnique({
      where: { userId_eventId: { userId: id, eventId } },
      include: { user: true, event: true },
    });

    if (!booking) {
      return ctx.json({ error: "Booking not found" }, 404);
    }

    return ctx.json(booking, 200);
  } catch {
    return ctx.text("An unknown error occurred", 500);
  }
});

// GET all the bookings of a user
bookRouter.openapi(getBookings, async (ctx) => {
  const { id } = ctx.get("jwtPayload");

  try {
    const userBookings = await prisma.booking.findMany({
      where: {
        userId: id,
      },
    });

    if (!userBookings) {
      return ctx.json({ error: "Bookings not found" }, 404);
    }

    return ctx.json(userBookings, 200);
  } catch (error) {
    return ctx.text(
      error instanceof Error ? error.message : "An unknown error occured",
      500
    );
  }
});

// Book an event
bookRouter.openapi(createBooking, async (ctx) => {
  const { id } = ctx.get("jwtPayload");
  const { eventId } = ctx.req.param();

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return ctx.json({ error: "Event not found" }, 404);
    }

    const existingBooking = await prisma.booking.findUnique({
      where: {
        userId_eventId: {
          userId: id,
          eventId: eventId,
        },
      },
    });

    if (existingBooking) {
      return ctx.json({ error: "User already booked this event" }, 400);
    }

    const booking = await prisma.booking.create({
      data: {
        userId: id,
        eventId: eventId,
      },
    });

    return ctx.json({ message: "Booking created successfully", booking }, 201);
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

// DELETE a booking
bookRouter.openapi(deleteBooking, async (ctx) => {
  const { id } = ctx.get("jwtPayload");
  const { eventId } = ctx.req.param();

  try {
    const booking = await prisma.booking.findUnique({
      where: { userId_eventId: { userId: id, eventId } },
    });

    if (!booking) {
      return ctx.json({ error: "Booking not found" }, 404);
    }

    await prisma.booking.delete({
      where: { userId_eventId: { userId: id, eventId } },
    });

    return ctx.json({ message: "Booking deleted successfully" }, 200);
  } catch {
    return ctx.text("An unknown error occurred", 500);
  }
});

export default bookRouter;
