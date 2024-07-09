"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useCartStore } from "@/hooks/use-cart";
import { useStore } from "@/hooks/store";
import { api } from "@/trpc/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const StickyCart = () => {
  const cartStore = useStore(useCartStore, (state) => state);
  const toast = useToast();
  const router = useRouter();

  const totalPrice = cartStore?.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const orderCheckout = api.order.checkout.useMutation({
    onSuccess: (data) => {
      cartStore?.clearCart();
      toast.toast({
        title: "Order Placed",
        description: "Your order has been placed",
      });
      // redirect to orders page
      return router.push(`/dashboard/orders/${data.id}`);
    },
    onError: (error) => {
      toast.toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleCheckout = async () => {
    if (!cartStore) return;
    await orderCheckout.mutateAsync(cartStore.items);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 rounded-md border-t border-gray-200 bg-white shadow-lg md:left-[280px] md:block">
      <Link href="/dashboard/cart" passHref>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Total: ${totalPrice}</span>
            <span className="text-xs text-muted-foreground">
              {cartStore?.items.length} items
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View Cart</Button>
            <Button
              onClick={(e) => {
                // Block the button click to propagate to link level
                e.preventDefault();
                cartStore?.clearCart();
              }}
              variant="outline"
            >
              Clear Cart
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                void handleCheckout();
              }}
              disabled={cartStore?.items.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
