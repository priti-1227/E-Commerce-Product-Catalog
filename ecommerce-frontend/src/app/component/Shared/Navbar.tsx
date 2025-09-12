"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL search params to persist search terms on refresh
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [cartCount, setCartCount] = useState(0); // This would come from a global state/context later

  // Debounce the search term to avoid firing searches on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // Use a ref to track the initial render
  const isInitialRender = useRef(true);
  useEffect(() => {
    // If it's the first time the component renders, do nothing.

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }

    // Always navigate to the products page to show search results
    router.push(`/products?${params.toString()}`);
  }, [debouncedSearchTerm, router, searchParams]); // Removed pathname

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-blue-500">
        <div className="pl-3 pr-2 text-gray-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-2 bg-gray-100 focus:outline-none"
        />
      </div>

      <Link href="/cart" className="relative ml-4">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
