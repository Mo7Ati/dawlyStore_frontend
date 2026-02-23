"use client";

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistCount, useWishlistHydrated } from "@/stores/wishlist/use-wishlist";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WishlistIconProps {
  className?: string;
  asLink?: boolean;
  href?: string;
  onClick?: () => void;
}

export function WishlistIcon({
  className,
  asLink = false,
  href = "/wishlist",
  onClick,
}: WishlistIconProps) {
  const count = useWishlistCount();
  const hydrated = useWishlistHydrated();

  const content = (
    <>
      <Heart className="h-5 w-5" />
      {hydrated && count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-medium"
        >
          {count > 99 ? "99+" : count}
        </Badge>
      )}
      <span className="sr-only">
        Wishlist with {count} {count === 1 ? "item" : "items"}
      </span>
    </>
  );

  if (asLink) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative", className)}
        asChild
      >
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
