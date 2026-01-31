"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart/use-cart";
import { CartItem as CartItemType, calculateItemTotal } from "@/stores/cart/cart-types";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { incrementQuantity, decrementQuantity, removeItem, updateQuantity } = useCart();

  const itemTotal = calculateItemTotal(item);
  const hasDiscount = item.comparePrice && item.comparePrice > item.unitPrice;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(item.cartItemId, value);
    }
  };

  return (
    <div
      className={cn(
        "group flex gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30",
        compact && "p-2"
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-md bg-muted",
          compact ? "h-16 w-16" : "h-20 w-20"
        )}
      >
        <Image
          src={item.productImageUrl}
          alt={item.productName}
          fill
          className="object-cover"
          sizes={compact ? "64px" : "80px"}
        />
        {hasDiscount && (
          <div className="absolute left-1 top-1 rounded-sm bg-destructive px-1 py-0.5 text-[10px] font-medium text-white">
            -{item.discountPercentage}%
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="space-y-1">
          <h4
            className={cn(
              "font-medium leading-tight line-clamp-2",
              compact ? "text-sm" : "text-base"
            )}
          >
            {item.productName}
          </h4>

          {/* Selected Options */}
          {item.selectedOptions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.selectedOptions.map((opt) => (
                <span
                  key={opt.id}
                  className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground"
                >
                  {opt.name}
                  {opt.price > 0 && ` (+$${opt.price.toFixed(2)})`}
                </span>
              ))}
            </div>
          )}

          {/* Selected Additions */}
          {item.selectedAdditions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.selectedAdditions.map((add) => (
                <span
                  key={add.id}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
                >
                  +{add.name}
                  {add.price > 0 && ` ($${add.price.toFixed(2)})`}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price and Quantity Controls */}
        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => decrementQuantity(item.cartItemId)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="h-7 w-12 rounded-md border bg-background text-center text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Quantity"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => incrementQuantity(item.cartItemId)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              {hasDiscount && (
                <p className="text-xs text-muted-foreground line-through">
                  ${(item.comparePrice! * item.quantity).toFixed(2)}
                </p>
              )}
              <p className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
                ${itemTotal.toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
              onClick={() => removeItem(item.cartItemId)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
