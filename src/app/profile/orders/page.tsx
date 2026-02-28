'use client'

import { Suspense } from "react";
import { getOrders } from "@/services/orders/order-service";
import { OrdersContent } from "./components/orders-content";
import { OrdersFallback } from "./components/orders-fallback";
import { OrdersHeader } from "./components/orders-header";

// Orders require auth; do not prerender at build time
export const dynamic = "force-dynamic";

export default function ProfileOrdersPage() {
  const ordersPromise = getOrders();

  return (
    <div className="w-full min-w-0 space-y-6">
      <OrdersHeader />
      <Suspense fallback={<OrdersFallback />}>
        <OrdersContent promise={ordersPromise} />
      </Suspense>
    </div>
  );
}
