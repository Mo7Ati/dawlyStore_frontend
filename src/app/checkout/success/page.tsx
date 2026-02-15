"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart/use-cart";

export default function CheckoutSuccessPage() {
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto max-w-lg px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/15">
          <CheckCircle2 className="size-9 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Payment successful
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm text-base">
          Thank you for your order. We&apos;ve received your payment and will
          start preparing your items. You can track the order in your profile.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/profile/orders" className="gap-2">
              <Package className="size-4" />
              View orders
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/stores" className="gap-2">
              <ShoppingBag className="size-4" />
              Continue shopping
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
