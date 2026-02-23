"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useWishlistStore } from "@/stores/wishlist/use-wishlist";

/**
 * When the user is logged in, sync wishlist from server.
 * On login: merges local wishlist to server (POST /wishlist/sync) then replaces state with API response.
 */
export function WishlistSync() {
  const { customer } = useAuth();

  useEffect(() => {
    if (!customer) return;
    const { mergeLocalToServerThenSync, syncFromServer } = useWishlistStore.getState();
    mergeLocalToServerThenSync().catch(() => {
      syncFromServer();
    });
  }, [customer]);

  return null;
}
