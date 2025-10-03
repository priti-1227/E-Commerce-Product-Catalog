"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

interface QuantitySelectorProps {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  isLoading: boolean;
}

export function QuantitySelector({
  initialQuantity,
  onQuantityChange,
  isLoading,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const debouncedOnQuantityChange = useCallback(
    debounce((newQuantity) => onQuantityChange(newQuantity), 500),
    [onQuantityChange]
  );

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    debouncedOnQuantityChange(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    debouncedOnQuantityChange(newQuantity);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={isLoading || quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        readOnly
        className="w-16 text-center"
        disabled={isLoading}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={isLoading}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
