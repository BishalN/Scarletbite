import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MenuItemModel, OrderModel } from "prisma/zod";
import { TRPCError } from "@trpc/server";

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

  checkout: protectedProcedure
    .input(
      z.array(MenuItemModel.extend({ quantity: z.number().int().default(1) }), {
        required_error: "at least one required",
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: add this check to validation using zod
      if (input.length === 0)
        throw new TRPCError({
          message: "No menu item in order",
          cause: "zero menu item",
          code: "BAD_REQUEST",
        });

      return ctx.db.order.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          orderItems: {
            createMany: {
              data: input.map((item) => {
                return {
                  quantity: item.quantity,
                  menuItemId: item.id,
                };
              }),
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

  getOrderById: protectedProcedure
    .input(OrderModel.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return ctx.db.order.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id, // only allow user to get their own orders
        },
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
          user: true,
        },
      });
    }),
});
