"use client";

import Link from "next/link";
import { XCircle, ShoppingCart, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutFailedPage() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/15">
          <XCircle className="size-9 text-destructive" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Payment didn&apos;t go through
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm text-base">
          Your payment was cancelled or something went wrong. Your cart is
          unchanged — you can try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/checkout" className="gap-2">
              <RefreshCw className="size-4" />
              Try again
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cart" className="gap-2">
              <ShoppingCart className="size-4" />
              Back to cart
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
