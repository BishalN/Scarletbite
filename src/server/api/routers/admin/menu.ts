import { MenuItemModel } from "prisma/zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const adminMenuRouter = createTRPCRouter({
  getAllMenus: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.menuItem.findMany();
  }),

  getMenuById: adminProcedure
    .input(MenuItemModel.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return ctx.db.menuItem.findUnique({
        where: { id: input.id },
      });
    }),

  createMenu: adminProcedure
    .input(MenuItemModel.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.menuItem.create({
        data: input,
      });
    }),

  updateMenu: adminProcedure
    .input(MenuItemModel)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.menuItem.update({
        where: { id: input.id },
        data: input,
      });
    }),

  // There is a foreign key constraint in the database that will prevent deletion if there are any related records in order
  deleteMenu: adminProcedure
    .input(MenuItemModel.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.menuItem.delete({
          where: { id: input.id },
        });
        return true;
      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete menu item",
          cause: error,
        });
      }
    }),
});
