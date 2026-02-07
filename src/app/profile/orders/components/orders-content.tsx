import Link from "next/link";
import { ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Response } from "@/types/general";
import type { Order } from "@/types/order";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

type OrdersContentProps = {
  promise: Promise<Response<Order[]>>;
};

export async function OrdersContent({ promise }: OrdersContentProps) {
  const response = await promise;
  const orders = response.data ?? [];

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Your orders</CardTitle>
        <CardDescription>
          Orders you have placed appear here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">No orders yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              When you place an order, it will show up here.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/stores">
                <Store className="mr-2 h-4 w-4" />
                Browse stores
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {order.order_number ?? `Order #${order.id}`}
                  </p>
                  <p className="text-sm text-muted-foreground wrap-break-word">
                    {formatDate(order.created_at)}
                    {order.item_count != null && ` · ${order.item_count} item(s)`}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
                  <Badge variant="secondary" className="capitalize">
                    {order.status}
                  </Badge>
                  <span className="font-medium">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
