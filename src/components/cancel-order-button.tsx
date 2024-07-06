"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { api } from "@/trpc/react";

export const CancelOrderButton = ({ orderId }: { orderId: number }) => {
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
    await orderCancel.mutateAsync({ id: orderId });
  };

  return <Button onClick={handleOrderCancel}>Cancel Order</Button>;
};
