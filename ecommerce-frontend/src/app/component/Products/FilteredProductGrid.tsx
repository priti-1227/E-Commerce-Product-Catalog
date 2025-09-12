// src/app/component/Products/FilteredProductGrid.tsx
import ProductGrid from "./ProductGrid";
import { Product } from "@/lib/types";

async function fetchProducts(
  query?: string,
  category?: string,
  sort?: string
): Promise<Product[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);

    const res = await fetch(`${apiUrl}/products?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export async function FilteredProductGrid({
  query,
  category,
  sort,
}: {
  query?: string;
  category?: string;
  sort?: string;
}) {
  // The component receives the query and passes it to the fetch function
  const products = await fetchProducts(query, category, sort);

  // We NO LONGER need to filter on the frontend. The backend did it for us.

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold">No products found for `{query}`</p>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
