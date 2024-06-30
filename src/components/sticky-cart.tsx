// what we want is a cart that sticks at the bottom of the screen when we scroll
// its gets its data from a internal data store that is persisted
// we can add items to the cart and remove them
// we can also change the quantity of the items
// we can also place an order
// we can also clear the cart
// we can also view the cart

import { Button } from "./ui/button";

export const StickyCart = () => {
  // It is basically a card that sticks to the bottom of the screen
  // if there are no items then hide the stickybar other wise show it
  // if there is a sidebar then clip the right hand side to right side of the sidebar
  // if no sidebar than take whole space default
  // also show the items on cart and ability to update the quantity of the items
  return (
    <div className="fixed bottom-0 left-[300px] right-0 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Total: $200</span>
          <span className="text-xs text-muted-foreground">2 items</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Cart</Button>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};
