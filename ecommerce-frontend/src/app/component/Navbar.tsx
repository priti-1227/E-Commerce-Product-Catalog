"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to products page with query params
    window.location.href = `/products?search=${searchTerm}&category=${category}`;
  };

  return (
    <nav className="w-full sticky bg-white shadow-md px-6 py-3 flex justify-between items-center">
      
      <Link href="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      {/* 🔍 Search + Filter */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-1/2 bg-gray-100 rounded-lg overflow-hidden"
      >
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 bg-gray-200 text-sm border-r"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-100 focus:outline-none"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="px-4 bg-blue-600 text-white flex items-center justify-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Cart Icon */}
      <Link href="/cart" className="relative ml-4">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
