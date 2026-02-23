"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistItems, useWishlistHydrated } from "@/stores/wishlist/use-wishlist";
import { useAuth } from "@/contexts/auth-context";
import WishlistSkeleton from "./wishlist-skeleton";
import ProductCard from "@/components/home/product-card";

export function WishlistContent() {
  const items = useWishlistItems();
  const hydrated = useWishlistHydrated();
  const { customer } = useAuth();

  if (!hydrated) {
    return (
      <WishlistSkeleton />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Save items you like by clicking the heart on product cards or the product page.
        </p>
        <Button asChild>
          <Link href="/stores">Browse Stores</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) =>
        item.product ? (
          <ProductCard
            key={`${item.product_id}-${item.store_id}`}
            product={item.product}
            store={item.product.store}
          />
        ) : null
      )}
    </div>
  );
}
