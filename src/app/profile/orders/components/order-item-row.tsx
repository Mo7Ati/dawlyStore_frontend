"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrderItem } from "@/types/order";

interface OrderItemRowProps {
  item: OrderItem;
}

function getVariantLabel(item: OrderItem): string | null {
  const product = item.product_data;
  const options = product.options;
  if (options && Array.isArray(options) && options.length > 0) {
    return options.map((opt) => opt.name).join(" · ");
  }
  return null;
}

export function OrderItemRow({ item }: OrderItemRowProps) {
  const product = item.product;
  const lineTotal = item.unit_price * item.quantity;

  return (
    <div className="flex gap-3 border-b border-border/60 py-4 last:border-b-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="space-y-0.5">
          <h4 className="font-semibold leading-tight text-foreground">
            {product.name}
          </h4>
          <p className="text-xs text-muted-foreground">
            {getVariantLabel(item)}
          </p>
          <p className="text-x text-muted-foreground">
            {item.quantity} x ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {getVariantLabel(item)}
          </p>
         
        </div>
      </div>
      <div className="flex shrink-0 items-start text-right">
        <span className="font-semibold text-foreground">
          ${lineTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
