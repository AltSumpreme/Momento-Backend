import type { Context } from "hono";
import { Role } from "@prisma/client";

export const checkRole = (roles: Role[], ctx: Context) => {
  if (!roles.includes(ctx.get("jwtPayload").role)) {
    return false;
  }
  return true;
};

export const getCurrentUser = (ctx: Context) => {
  return ctx.get("jwtPayload");
};
