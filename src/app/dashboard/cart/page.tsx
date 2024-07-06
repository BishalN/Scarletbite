"use client";

import { DashLayout } from "@/components/dashboard-layout";
import { StickyCart } from "@/components/sticky-cart";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/store";
import { useCartStore } from "@/hooks/use-cart";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

import NextImage from "next/image";

export default function CartPage() {
  const cartStore = useStore(useCartStore, (state) => state);

  return (
    <DashLayout>
      <div className="my-4 px-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        {cartStore && cartStore?.items.length > 0 ? (
          <div className="space-y-3">
            {cartStore.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2"
              >
                <NextImage
                  src={item.thumbnail!}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="text-sm font-semibold">
                    ${item.price} x {item.quantity} = $
                    {item.price * item.quantity}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        cartStore?.updateItem(item, item.quantity - 1)
                      }
                      variant="outline"
                      className="p-2"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() =>
                        cartStore?.updateItem(item, item.quantity + 1)
                      }
                      variant="outline"
                      className="p-2"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button onClick={() => cartStore?.clearCart()} variant="outline">
                Clear Cart
              </Button>
              <Button>Checkout</Button>
            </div>
          </div>
        ) : (
          <div>
            <h1>Your cart is empty</h1>
          </div>
        )}
      </div>
      <StickyCart />
    </DashLayout>
  );
}
