"use client";

import Link from "next/link";
import { CancelOrderButton } from "./cancel-order-button";

import { type Order } from "@prisma/client";

// TODO: add total price prop to show also fix the estimated delivery from the backend
export const OrderItemCard = ({ order }: { order: Order }) => {
  return (
    <div className="cursor-pointer space-y-1 rounded-md bg-gray-100 px-4 py-2 shadow-sm">
      <Link
        href={`/dashboard/orders/${order.id}`}
        passHref={true}
        key={order.id}
      >
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              Your order is now on {order.status} status
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimated delivery time: 20 minutes
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <CancelOrderButton orderId={order.id} />
        </div>
      </Link>
    </div>
  );
};
