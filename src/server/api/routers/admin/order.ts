import { OrderModel } from "prisma/zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";

export const adminOrderRouter = createTRPCRouter({
  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.order.findMany({
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
  getOrderById: adminProcedure
    .input(OrderModel.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return ctx.db.order.findFirst({
        where: {
          id: input.id,
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

  updateOrderStatus: adminProcedure
    .input(OrderModel.pick({ id: true, status: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.order.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
