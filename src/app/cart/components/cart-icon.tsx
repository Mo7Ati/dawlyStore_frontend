"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartItemCount } from "@/stores/cart/use-cart";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CartIconProps {
  className?: string;
  asLink?: boolean;
  href?: string;
  onClick?: () => void;
}

export function CartIcon({ className, asLink = false, href = "/cart", onClick }: CartIconProps) {
  const itemCount = useCartItemCount();

  const content = (
    <>
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-medium"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
      <span className="sr-only">
        Shopping cart with {itemCount} {itemCount === 1 ? "item" : "items"}
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
    <Button variant="ghost" size="icon" className={cn("relative", className)} onClick={onClick}>
      {content}
    </Button>
  );
}
