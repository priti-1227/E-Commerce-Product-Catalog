// src/app/products/[slug]/page.tsx

import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import { Product } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/app/component/Products/AddToCartButton";

// This function finds the specific product from our dummy data
// In a real app, this would be an API call: getProductBySlug(slug)
async function getProductById(id: string): Promise<Product | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/products/${id}`, { cache: "no-store" });

    // If the product is not found, the backend will send a 404, so res.ok will be false.
    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null; // Return null on network or other errors
  }
}

// The component receives `params` which contains the slug
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const product = await getProductById(slug);

  // If no product is found, show the 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="space-y-4">
          <Badge variant="secondary">{product.category_name}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-3xl font-semibold">₹{product.price}</p>
          <p className="text-sm text-gray-500">
            {product.stock_quantity} units in stock
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
