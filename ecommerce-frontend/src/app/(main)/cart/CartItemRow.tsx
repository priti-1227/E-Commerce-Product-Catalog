"use client";

import { CartItem } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function CartItemRow({ item }: { item: CartItem }) {
  const handleRemove = () => {
    // In a real app, you would call a Server Action or API endpoint here.
    console.log(`Removing item ${item.id}`);
    toast.success(`${item.name} removed from cart!`);
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Image
        src={item.image_url || "/placeholder.svg"}
        alt={item.name}
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>Qty: {item.quantity}</p>
        <Button variant="outline" size="icon" onClick={handleRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
