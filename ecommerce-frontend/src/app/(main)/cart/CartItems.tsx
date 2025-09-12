// src/components/cart/CartItems.tsx
import { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartItemRow } from "./CartItemRow";

export function CartItems({ items }: { items: CartItem[] }) {
  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-4">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 50.0; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg h-fit border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-6" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
