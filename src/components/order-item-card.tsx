"use client";

import { type CompleteOrder } from "prisma/zod";
import Link from "next/link";
import { CancelOrderButton } from "./cancel-order-button";

import NextImage from "next/image";

// TODO: Extract the type fro, the trpc api and use it here
export const OrderItemCard = ({ order }: { order: CompleteOrder }) => {
  return (
    <div className="cursor-pointer space-y-1 rounded-md bg-gray-100 px-4 py-2 shadow-sm">
      <Link
        href={`/dashboard/orders/${order.id}`}
        passHref={true}
        key={order.id}
      >
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <div className="flex items-center gap-2">
          <NextImage
            src={order.orderItems[0]?.menuItem.thumbnail ?? "/food.jpg"}
            alt={order.orderItems[0]?.menuItem.name ?? "Order Item"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              Your order is now on {order.status} status
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimated delivery time: 20 minutes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">
            ${order.orderItems[0]?.menuItem.price} per plate
          </p>
        </div>
        <div className="flex gap-3">
          <CancelOrderButton orderId={order.id} />
        </div>
      </Link>
    </div>
  );
};
