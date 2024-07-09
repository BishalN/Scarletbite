import { UserModel } from "prisma/zod";
import { adminProcedure, createTRPCRouter, superProcedure } from "../../trpc";
import { z } from "zod";

export const adminUserRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  roleUpdate: superProcedure
    .input(
      UserModel.pick({ id: true }).extend({
        role: z.enum(["USER", "ADMIN"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: { role: input.role },
      });
    }),
});
