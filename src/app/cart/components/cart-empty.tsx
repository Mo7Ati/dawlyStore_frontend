"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartEmptyProps {
  className?: string;
  title?: string;
  description?: string;
  showActions?: boolean;
}

export function CartEmpty({
  className,
  title = "Your cart is empty",
  description = "Looks like you haven't added anything to your cart yet. Start exploring our vendors and find something you love!",
  showActions = true,
}: CartEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className
      )}
    >
      <div className="mb-6 rounded-full bg-muted p-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">{description}</p>

      {showActions && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/stores">
              <Store className="mr-2 h-4 w-4" />
              Browse Stores
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
