"use client";

import { type MenuItem } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OrderItem = MenuItem & { quantity: number };

interface useCartStore {
  items: OrderItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  updateItem: (item: MenuItem, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<useCartStore>(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) return;
        set({ items: [...get().items, { ...item, quantity: 1 }] });
      },
      removeItem: (item) => {
        set({
          items: get().items.filter((i) => i.id !== item.id),
        });
      },
      updateItem: (item, quantity) => {
        set({
          items: get().items.map((i) =>
            i.id === item.id ? { ...i, quantity } : i,
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "sidebarOpen",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
