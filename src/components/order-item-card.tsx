"use client";

import { type CompleteOrder } from "prisma/zod";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

// TODO: Extract the type fro, the trpc api and use it here
export const OrderItemCard = ({ order }: { order: CompleteOrder }) => {
  const router = useRouter();
  const toast = useToast();

  const orderCancel = api.order.cancelMyOrder.useMutation({
    onSuccess: async () => {
      toast.toast({
        title: "Order cancelled successfully",
        description: "Your order has been cancelled successfully",
      });

      router.push("/dashboard/orders");

      router.refresh();
    },
    onError: (error) => {
      toast.toast({
        title: "Failed to cancel order",
        description: error.message,
      });
    },
  });

  const handleOrderCancel = async () => {
    await orderCancel.mutateAsync({ id: order.id });
  };

  return (
    <div className="cursor-pointer space-y-1 rounded-md bg-gray-100 px-4 py-2 shadow-sm">
      <Link
        href={`/dashboard/orders/${order.id}`}
        passHref={true}
        key={order.id}
      >
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <div className="flex items-center gap-2">
          <img
            src={order.orderItems[0]?.menuItem.thumbnail}
            alt={order.id}
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
          {/* <Button onClick={handleOrderNow}>Order now</Button> */}
          <Button onClick={handleOrderCancel} variant="outline">
            Cancel Order
          </Button>
        </div>
      </Link>
    </div>
  );
};
