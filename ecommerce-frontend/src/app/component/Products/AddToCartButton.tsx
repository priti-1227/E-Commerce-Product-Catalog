"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// A mock function to check if the user is logged in.
// In a real app, this would check a global state, context, or a cookie.
const isUserLoggedIn = (): boolean => {
  // For now, we'll return false to simulate a logged-out user.
  // Change this to `true` to test the logged-in behavior.
  return false;
};

export function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      // If the user is not logged in, redirect them to the login page.
      // We can also pass a callback URL to return them here after login.
      toast.error("Please log in to add items to your cart.");
      router.push(`/login?callbackUrl=/products/${productId}`);
    } else {
      // If the user is logged in, add the item to the cart.
      // This is where you would call your cart logic (e.g., a server action or API call).
      console.log(`Product ${productId} added to cart!`);
      // Optionally, redirect to the cart page after adding.
      // router.push("/cart");
      toast.success("Product added to your cart!");
    }
  };

  return (
    <Button className="w-full mt-2" onClick={handleAddToCart}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
