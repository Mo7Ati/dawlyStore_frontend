"use client";

import { Store, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/stores/cart/use-cart";
import { StoreCartGroup } from "@/stores/cart/cart-types";
import { CartItem } from "./cart-item";
import { cn } from "@/lib/utils";

interface StoreGroupProps {
  group: StoreCartGroup;
  compact?: boolean;
  showRemoveAll?: boolean;
}

export function StoreGroup({
  group,
  compact = false,
  showRemoveAll = true,
}: StoreGroupProps) {
  const { removeStoreItems } = useCart();

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      {/* Store Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Store className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{group.storeName}</h3>
            <p className="text-xs text-muted-foreground">
              {group.itemCount} {group.itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {showRemoveAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeStoreItems(group.storeId)}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove all
          </Button>
        )}
      </div>

      {/* Items */}
      <div className={cn("space-y-3 p-4", compact && "space-y-2 p-3")}>
        {group.items.map((item) => (
          <CartItem key={item.cartItemId} item={item} compact={compact} />
        ))}
      </div>

      {/* Store Subtotal */}
      <div className="border-t bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-lg font-semibold">${group.subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
