"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistItems, useWishlistActions } from "@/stores/wishlist/use-wishlist";
import type { WishlistItem } from "@/stores/wishlist/wishlist-types";
import { useAuth } from "@/contexts/auth-context";

const DROPDOWN_PREVIEW_COUNT = 5;

function WishlistDropdownRow({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: (product_id: string, store_id: string) => void;
}) {
  const productUrl = `/stores/${item.store_slug}/products/${item.product_slug}`;

  return (
    <div className="flex items-start gap-3 py-3">
      <Link
        href={productUrl}
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.product_image_url ?? "/fallback.png"}
          alt={item.product_name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={productUrl}
          className="text-sm font-medium line-clamp-2 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {item.product_name}
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">${item.price.toFixed(2)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item.product_id, item.store_id)}
        aria-label="Remove from wishlist"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface WishlistDropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function WishlistDropdown({ isOpen, setIsOpen }: WishlistDropdownProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const items = useWishlistItems();
  const { customer } = useAuth();
  const { removeItem } = useWishlistActions(!!customer);
  const previewItems = items.slice(0, DROPDOWN_PREVIEW_COUNT);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div ref={cardRef} className="absolute right-0 top-full mt-2 w-[340px] z-50">
      <div className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5" />
            Wishlist ({items.length})
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(false)}
            aria-label="Close wishlist"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">Your wishlist is empty</p>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto divide-y">
                {previewItems.map((item) => (
                  <WishlistDropdownRow
                    key={`${item.product_id}-${item.store_id}`}
                    item={item}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center text-sm font-medium text-primary hover:underline border-t"
              >
                View all ({items.length})
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
