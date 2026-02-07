"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartSummary } from "@/stores/cart/use-cart";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
  className?: string;
}

export function CartSummary({
  onCheckout,
  showCheckoutButton = true,
  className,
}: CartSummaryProps) {
  const summary = useCartSummary();

  if (summary.isEmpty) {
    return null;
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Vendor Breakdown */}
        <div className="space-y-2">
          {summary.storeGroups.map((group) => (
            <div
              key={group.store_id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {group.storeName} ({group.itemCount} items)
              </span>
              <span>${group.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Summary Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Items</span>
            <span>{summary.totalItems}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Stores</span>
            <span>{summary.storeCount}</span>
          </div>
        </div>

        <Separator />

        {/* Grand Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Grand Total</span>
          <span className="text-2xl font-bold text-primary">
            ${summary.grandTotal.toFixed(2)}
          </span>
        </div>

        {/* Price Disclaimer */}
        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Final prices will be confirmed at checkout. Prices may vary based on
            availability and current promotions.
          </p>
        </div>
      </CardContent>

      {showCheckoutButton && (
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            size="lg"
            onClick={onCheckout}
            asChild={!onCheckout}
          >
            {onCheckout ? (
              <>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/stores">Continue Shopping</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
