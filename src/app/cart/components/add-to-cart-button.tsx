"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useIsInCart } from "@/stores/cart/use-cart";
import { AddToCartPayload, CartItemOption, CartItemAddition } from "@/stores/cart/cart-types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    image_url: string;
    price: number;
    comparePrice: number | null;
    discountPercentage: number | null;
  };
  store: { id: string; name: string };
  selectedOptions?: CartItemOption[];
  selectedAdditions?: CartItemAddition[];
  quantity?: number;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showQuantityControls?: boolean;
  className?: string;
  disabled?: boolean;
  onSuccess?: () => void;
}

export function AddToCartButton({
  product,
  store,
  selectedOptions = [],
  selectedAdditions = [],
  quantity: initialQuantity = 1,
  variant = "default",
  size = "default",
  showQuantityControls = false,
  className,
  disabled = false,
  onSuccess,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const isInCart = useIsInCart(product.id, store.id.toString());
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);

    // Simulate a small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    const payload: AddToCartPayload = {
      productId: product.id,
      productName: product.name,
      productImageUrl: product.image_url.toString(),
      storeId: store.id,
      storeName: store.name,
      unitPrice: product.price,
      comparePrice: product.comparePrice,
      discountPercentage: product.discountPercentage,
      quantity,
      selectedOptions,
      selectedAdditions,
    };

    addItem(payload);

    setIsAdding(false);
    setJustAdded(true);

    toast.success(`${product.name} added to cart`, {
      description: `${quantity} item${quantity > 1 ? "s" : ""} from ${store.name}`,
    });

    // Reset the "just added" state after animation
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);

    onSuccess?.();
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  // Icon-only variant
  if (size === "icon") {
    return (
      <Button
        variant={variant}
        size="icon"
        className={cn(
          "transition-all",
          justAdded && "bg-green-500 hover:bg-green-600",
          className
        )}
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        aria-label="Add to cart"
      >
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showQuantityControls && (
        <div className="flex items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="flex h-9 w-12 items-center justify-center text-sm font-medium">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={incrementQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Button
        variant={justAdded ? "default" : variant}
        size={size}
        className={cn(
          "flex-1 transition-all",
          justAdded && "bg-green-500 hover:bg-green-600"
        )}
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
      >
        {isAdding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : justAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isInCart ? "Add More" : "Add to Cart"}
          </>
        )}
      </Button>
    </div>
  );
}
