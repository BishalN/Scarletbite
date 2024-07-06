import { PreferenceModel } from "prisma/zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const adminPreferencesRouter = createTRPCRouter({
  create: adminProcedure
    .input(PreferenceModel.omit({ id: true, userId: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.preference.create({
        data: {
          ...input,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });
    }),

  update: adminProcedure
    .input(PreferenceModel)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.preference.update({
        where: { id: input.id },
        data: input,
      });
    }),
});
