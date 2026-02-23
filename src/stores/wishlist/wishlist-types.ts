/**
 * Wishlist type definitions.
 * Product-level bookmarking; one entry per (product_id, store_id).
 */

import type { Product } from "@/types/product";

export type WishlistItem = {
  product_id: string;
  store_id: string;
  store_slug: string;
  product_name: string;
  product_slug: string;
  product_image_url: string;
  price: number;
  compare_price?: number | null;
  added_at: number;
  /**
   * Full product snapshot for rendering rich UI like ProductCard.
   * Optional to allow older persisted data without this field.
   */
  product?: Product;
};

export type WishlistState = {
  items: WishlistItem[];
  hydrated: boolean;
  lastUpdated: number;
  setHydrated: () => void;
};

export type WishlistActions = {
  setItems: (items: WishlistItem[]) => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (product_id: string, store_id: string) => void;
  toggleItem: (item: WishlistItem) => boolean;
  syncFromServer: () => Promise<void>;
  mergeLocalToServerThenSync: () => Promise<void>;
  clear: () => void;
};

export type WishlistStore = WishlistState & WishlistActions;

export function wishlistItemId(product_id: string, store_id: string): string {
  return `${product_id}:${store_id}`;
}

export function isSameWishlistItem(
  a: WishlistItem,
  b: { product_id: string; store_id: string }
): boolean {
  return a.product_id === b.product_id && a.store_id === b.store_id;
}
