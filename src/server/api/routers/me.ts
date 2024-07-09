// get the current users details

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const meRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.session);
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
