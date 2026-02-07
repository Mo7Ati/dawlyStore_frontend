import { Suspense } from "react";
import { getOrders } from "@/services/orders/order-service";
import { OrdersContent } from "./components/orders-content";
import { OrdersFallback } from "./components/orders-fallback";

export default function ProfileOrdersPage() {
  const ordersPromise = getOrders();

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">Previous orders</h1>
        <p className="text-muted-foreground text-sm">
          View and track your order history.
        </p>
      </div>
      <Suspense fallback={<OrdersFallback />}>
        <OrdersContent promise={ordersPromise} />
      </Suspense>
    </div>
  );
}
