"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Store,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Response } from "@/types/general";
import type {
  CustomerOrdersData,
  CheckoutGroup,
  CustomerOrder,
  OrderItem,
} from "@/types/order";
import { use } from "react";

function OrderItemRow({ item }: { item: OrderItem }) {
  console.log(item);

  const total = item.unit_price * item.quantity;
  return (
    <li className="flex items-start justify-between gap-2 border-b border-border/60 py-2 last:border-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{item.product_data.name}</p>
        {/* {(item.options || item.additions) && (
          <p className="text-xs text-muted-foreground">
            {[item.options, item.additions].filter(Boolean).join(" · ")}
          </p>
        )} */}
        <p className="text-xs text-muted-foreground">
          {item.quantity} × {item.unit_price.toFixed(2)} $
        </p>
      </div>
      <span className="shrink-0 text-sm font-medium">
        {total.toFixed(2)} $
      </span>
    </li>
  );
}

function StoreOrderCard({ order }: { order: CustomerOrder }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-3 flex items-center gap-2">
        {order.store.image_url ? (
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={order.store.image_url}
              alt=""
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        ) : (
          <Store className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
        <span className="font-medium">{order.store.name}</span>
        <span className="ml-auto text-sm font-medium">
          {order.total.toFixed(2)} $
        </span>
      </div>
      <ul className="space-y-0">
        {order.items.map((item, idx) => (
          <OrderItemRow key={item.id ?? idx} item={item} />
        ))}
      </ul>
    </div>
  );
}

function GroupCard({ group }: { group: CheckoutGroup }) {
  return (
    <Collapsible defaultOpen className="group/collapse">
      <Card className="w-full overflow-hidden transition-shadow hover:shadow-md">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
          >
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]/collapse:rotate-180" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base">
                  {group.created_at}
                </CardTitle>
                <CardDescription>
                  {group.orders_count} order{group.orders_count !== 1 ? "s" : ""}{" "}
                  · Group total {group.group_total.toFixed(2)} $
                </CardDescription>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={
                    group.payment_status === "paid" ? "default" : "secondary"
                  }
                  className="capitalize"
                >
                  {group.payment_status}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapse:rotate-90" />
              </div>
            </CardHeader>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-3 pt-0">
            {group.orders.map((order) => (
              <StoreOrderCard key={order.id} order={order} />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

type OrdersContentProps = {
  promise: Promise<Response<CustomerOrdersData>>;
};

export function OrdersContent({ promise }: OrdersContentProps) {
  const response = use(promise);
  const groups = response.data?.groups ?? [];

  return (
    <div className="w-full space-y-4">
      {groups.length === 0 ? (
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle>Your orders</CardTitle>
            <CardDescription>
              Orders you have placed appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-muted-foreground text-sm">
            {groups.length} checkout{groups.length !== 1 ? "s" : ""} in your
            history. Expand to see orders by store.
          </p>
          <ul className="space-y-4">
            {groups.map((group) => (
              <li key={group.checkout_group_id}>
                <GroupCard group={group} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
