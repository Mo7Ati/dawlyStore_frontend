"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CheckoutGroup } from "@/types/order";
import { OrderStoreGroup } from "./order-store-group";

interface OrderGroupCardProps {
  group: CheckoutGroup;
}

export function OrderGroupCard({ group }: OrderGroupCardProps) {
  const firstOrder = group.orders[0];
  const paymentStatus = firstOrder?.payment_status;
  console.log(group);

  return (
    <Card className="overflow-hidden">
      <Collapsible defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full flex-col gap-4 border-b border-border/60 px-6 pb-4 pt-6 text-left text-sm transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted sm:flex-row sm:items-start sm:justify-between [&[data-state=open]>div]:pb-4"
          >
            <div className="flex items-start gap-6 sm:gap-8">
              <div className="flex items-center gap-1">
                <span className="flex h-8 w-8 shrink-0 -ml-2 items-center justify-center text-muted-foreground transition-colors group-hover/collapsible:text-foreground">
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]/collapsible:-rotate-90" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Order placed</p>
                  <p className="font-medium">{group.created_at}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Order number</p>
                <p className="font-medium">#{group.checkout_group_id}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-medium">${group.group_total.toFixed(2)}</p>
              </div>
              {paymentStatus && (
                <div className="flex items-center gap-2">
                  {paymentStatus.value && (
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                  <span className="text-sm font-medium">{paymentStatus.label}</span>
                </div>
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-4 p-4">
              {group.orders.map((order) => (
                <OrderStoreGroup key={order.id} order={order} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-between border-t border-border/60 pt-4 text-sm">
            <Link
              href="#"
              className="font-medium text-foreground hover:underline"
            >
              View order details
              <ChevronRight className="ml-0.5 inline-block h-4 w-4" />
            </Link>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
