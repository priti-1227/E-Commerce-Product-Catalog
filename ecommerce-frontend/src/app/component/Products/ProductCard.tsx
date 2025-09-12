import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types"; // Assuming you have this type defined
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <a href={`/products/${product.id}`} className="block">
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardHeader className="p-0">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="rounded-t-md object-cover w-full h-48"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg leading-tight truncate">
            {product.name}
          </CardTitle>
        </CardContent>
        <div className="px-4 pb-4 pt-2">
          <p className="text-xl font-semibold text-gray-800">
            ₹{product.price}
          </p>
          <Badge variant="secondary" className="my-2">
            {product.category_name}
          </Badge>
          <AddToCartButton productId={product.id} />
        </div>
      </Card>
    </a>
  );
}
