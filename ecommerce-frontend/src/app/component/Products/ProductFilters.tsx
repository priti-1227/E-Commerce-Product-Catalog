"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// You would fetch these categories from your API in a real app
const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Sports",
  "Home & Garden",
  "beauty",
];
const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
];
interface Category {
  name: string;
}

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  // Get the active filter/sort values from the URL
  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");

  useEffect(() => {
    const fetchCategories = async () => {
      const apiurl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiurl}/categories`);
      const data: Category[] = await res.json();
      setCategories(data.map((c) => c.name));
    };
    fetchCategories();
  }, []);

  // Function to create/update the query string
  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [name, value] of Object.entries(paramsToUpdate)) {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      }
      return params.toString();
    },
    [searchParams]
  );
  const handleFilterChange = (paramsToUpdate: Record<string, string>) => {
    const newQueryString = createQueryString(paramsToUpdate);
    router.push(`/products?${newQueryString}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Funnel className="w-4 h-4 mr-2" />
          Filter & Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => handleFilterChange({ category })}
            className={activeCategory === category ? "bg-accent" : ""}
          >
            {category}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleFilterChange({ sort: option.value })}
            className={activeSort === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleFilterChange({ category: "", sort: "" })}
        >
          Clear Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
