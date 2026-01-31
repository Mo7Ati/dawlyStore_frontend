"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCartSummary, useCartItemCount } from "@/stores/cart/use-cart";
import { StoreGroup } from "./store-group";
import { CartEmpty } from "./cart-empty";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  children?: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const summary = useCartSummary();
  const itemCount = useCartItemCount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {summary.isEmpty ? (
          <div className="flex-1">
            <CartEmpty showActions={false} />
            <div className="mt-4 flex justify-center">
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/stores">Browse Stores</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        ) : (
          <>
            {/* Scrollable Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 pb-4">
                {summary.storeGroups.map((group) => (
                  <StoreGroup
                    key={group.storeId}
                    group={group}
                    compact
                    showRemoveAll={false}
                  />
                ))}
              </div>
            </ScrollArea>

            <Separator />

            {/* Summary Footer */}
            <SheetFooter className="flex-col gap-4 sm:flex-col">
              {/* Quick Summary */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {summary.storeCount} store{summary.storeCount > 1 ? "s" : ""}
                  </span>
                  <span className="text-muted-foreground">
                    {summary.totalItems} item{summary.totalItems > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    ${summary.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-col gap-2">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart">View Full Cart</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
