"use client";

import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "@/features/cart/cartApiSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { ref } from "yup";
import { QuantitySelector } from "@/app/component/cart/QuantitySelector";

export default function CartPage() {
  const {
    data: cartItems,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCartQuery();
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateCartItem({ itemId, quantity: newQuantity });
    refetch();
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId).unwrap();
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );
  }

  if (isError || !isSuccess || !cartItems) {
    return (
      <div className="text-center py-20 text-red-500">Error loading cart.</div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-4">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price as any) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-10 px-4 pt-24">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cart_item_id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ₹{parseFloat(item.price as any).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* --- REPLACE THE INPUT WITH THE NEW COMPONENT --- */}
                <QuantitySelector
                  initialQuantity={item.quantity}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(item.cart_item_id, newQuantity)
                  }
                  isLoading={isUpdating}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveItem(item.cart_item_id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg h-fit border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
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
