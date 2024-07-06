"use client";

import { type MenuItem } from "@prisma/client";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/store";
import { useCartStore } from "@/hooks/use-cart";

import NextImage from "next/image";

export const MenuItemCard = ({ menuItem }: { menuItem: MenuItem }) => {
  const router = useRouter();
  const toast = useToast();

  const sidebar = useStore(useCartStore, (state) => state);

  const orderNow = api.order.orderNow.useMutation({
    onSuccess: async () => {
      toast.toast({
        title: "Order placed successfully",
        description: "Your order has been placed successfully",
      });

      router.push("/dashboard/orders");

      router.refresh();
    },
    onError: (error) => {
      toast.toast({
        title: "Failed to place order",
        description: error.message,
      });
    },
  });

  // TODO: Should we directly create order or present user with number of quantities to be ordered dialog?
  const handleOrderNow = async () => {
    await orderNow.mutateAsync(menuItem);
  };

  const handleAddToCart = () => {
    sidebar?.addItem(menuItem);
    toast.toast({
      title: "Item added to cart",
      description: `${menuItem.name} has been added to cart`,
    });
  };

  return (
    <div
      key={menuItem.id}
      className="flex flex-col gap-2 rounded-lg border p-4"
    >
      <div className="flex items-center gap-2">
        <NextImage
          src={menuItem.thumbnail!}
          alt={menuItem.name}
          className="h-16 w-16 rounded-lg"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{menuItem.name}</h3>
          <p className="text-sm text-muted-foreground">
            {menuItem.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">${menuItem.price} per plate</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleOrderNow}>Order now</Button>
        <Button onClick={handleAddToCart} variant="secondary">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
