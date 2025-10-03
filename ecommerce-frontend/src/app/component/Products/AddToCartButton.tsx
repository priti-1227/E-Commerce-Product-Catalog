"use client";

import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useAddToCartMutation } from "@/features/cart/cartApiSlice";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();
  const [addToCart, { isLoading }] = useAddToCartMutation();
  // Get the user's login status from the global Redux state
  const { token } = useSelector((state: RootState) => state.auth);
  console.log(token, "test token");

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }
    try {
      await addToCart({ productId, quantity: 1 }).unwrap();
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", error);
    }
  };

  return (
    <Button
      className="w-full mt-2"
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
