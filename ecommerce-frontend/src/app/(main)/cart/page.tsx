// src/app/(main)/cart/page.tsx
import { Button } from "@/components/ui/button";
import { DUMMY_CART_ITEMS } from "@/lib/dummy-data";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { CartItems } from "./CartItems";

// In a real app, you'd check for a session cookie or token here.
// For now, we simulate this server-side check.
async function checkUserLoggedIn(): Promise<boolean> {
  // Change to `true` to see the logged-in cart view.
  return false;
}

export default async function CartPage() {
  const isLoggedIn = await checkUserLoggedIn();

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg border">
          <AlertCircle className="w-12 h-12 mx-auto text-yellow-500" />
          <h1 className="text-2xl font-bold mt-4">Please Log In</h1>
          <p className="text-gray-600 mt-2 mb-6">
            You need to be logged in to view your cart and add items.
          </p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  // If the user is logged in, fetch their cart items.
  // We'll use dummy data for now.
  const cartItems = DUMMY_CART_ITEMS;

  return <CartItems items={cartItems} />;
}
