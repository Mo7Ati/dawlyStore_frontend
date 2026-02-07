"use client";

import type { Response } from "@/types/general";
import type { CustomerOrdersData } from "@/types/order";
import { use } from "react";
import { OrderGroupCard } from "./order-group-card";

type OrdersContentProps = {
  promise: Promise<Response<CustomerOrdersData>>;
};

export function OrdersContent({ promise }: OrdersContentProps) {
  const response = use(promise);
  const groups = response.data?.groups ?? [];

  if (!response.data) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
        Unable to load orders. Please try again later.
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-4 py-12 text-center">
        <p className="text-muted-foreground">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <OrderGroupCard key={group.checkout_group_id} group={group} />
      ))}
    </div>
  );
}
