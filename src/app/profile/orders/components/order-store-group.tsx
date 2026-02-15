"use client";

import type { CustomerOrder } from "@/types/order";
import { OrderItemRow } from "./order-item-row";
import Image from "next/image";

interface OrderStoreGroupProps {
  order: CustomerOrder;
}

export function OrderStoreGroup({ order }: OrderStoreGroupProps) {
  const itemCount = order.items.length;

  return (
    <div className="rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Image src={order.store.logo ?? ""} alt={order.store.name} width={32} height={32} />
        </div>
        <div>
          <h3 className="font-semibold">{order.store.name}</h3>
          <p className="text-xs text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <span className="ml-auto text-sm font-medium">{order.status.label}</span>
      </div>
      <div className="divide-y divide-border/60 px-4">
        {order.items.map((item, index) => (
          <OrderItemRow
            key={item.id ?? item.product_id ?? index}
            item={item}
          />
        ))}
      </div>
      <div className="border-t border-border/60 bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-semibold">
            ${order.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
