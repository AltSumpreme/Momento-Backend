import { OpenAPIHono } from "@hono/zod-openapi";
import prisma from "../../lib/prisma.js";

const bookRouter = new OpenAPIHono();

bookRouter.openapi(getBooking, async (ctx) => {
  const { bookingId } = await ctx.req.json();

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, event: true },
    });

    if (!booking) {
      return ctx.text("Booking not found", 404);
    }

    return ctx.json(booking, 200);
  } catch {
    return ctx.text("An unknown error occurred", 500);
  }
});
