import { adminProcedure, createTRPCRouter } from "../../trpc";

export const adminUserRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});
