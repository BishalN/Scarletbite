import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MenuItemModel, OrderModel } from "prisma/zod";

export const orderRouter = createTRPCRouter({
  orderNow: protectedProcedure
    .input(
      MenuItemModel.extend({
        quantity: z.number().int().default(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          orderItems: {
            create: {
              quantity: input.quantity,
              menuItem: {
                connect: {
                  id: input.id,
                },
              },
            },
          },
        },
      });
    }),

  myOrders: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.order.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }),

  cancelMyOrder: protectedProcedure
    .input(OrderModel.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id, // only allow user to delete their own orders
        },
      });
    }),
});
