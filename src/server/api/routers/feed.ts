import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// we need the router to get the user feed i.e all the menu items that are available to the user

export const feedRouter = createTRPCRouter({
  getAllMenus: publicProcedure.query(async ({ ctx }) => {
    // return all the menu items
    return ctx.db.menuItem.findMany();
  }),
});
