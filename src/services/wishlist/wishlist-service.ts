import api from "@/lib/api";
import { Response } from "@/types/general";
import { Product } from "@/types/product";
import type { Store } from "@/types/store";
import type { WishlistItem } from "@/stores/wishlist/wishlist-types";

export function productToWishlistItem(p: Product): WishlistItem {
  return {
    product_id: p.id,
    store_id: p.store_id,
    store_slug: p.store?.slug ?? "",
    product_name: p.name,
    product_slug: p.slug,
    product_image_url: p.images?.[0] ?? "",
    price: p.price,
    compare_price: p.compare_price ?? null,
    added_at: Date.now(),
    product: p,
  };
}

/** Build WishlistItem from Product and optional Store (e.g. from product card or overview). */
export function buildWishlistItem(product: Product, store?: Store | null): WishlistItem {
  const storeId = store?.id ?? product.store_id;
  const storeSlug = store?.slug ?? product.store?.slug ?? "";
  return {
    product_id: product.id,
    store_id: storeId,
    store_slug: storeSlug,
    product_name: product.name,
    product_slug: product.slug,
    product_image_url: product.images?.[0] ?? "",
    price: product.price,
    compare_price: product.compare_price ?? null,
    added_at: Date.now(),
    product,
  };
}

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const response = await api.get<Response<Product[]>>("/wishlist");
  const products = response.data.data ?? [];
  return products.map(productToWishlistItem);
}

export async function addToWishlistApi(product_id: string): Promise<void> {
  await api.post("/wishlist", { product_id });
}

export async function removeFromWishlistApi(product_id: string): Promise<void> {
  await api.delete(`/wishlist/${product_id}`);
}

export async function syncWishlistApi(product_ids: string[]): Promise<WishlistItem[]> {
  const response = await api.post<Response<Product[]>>("/wishlist/sync", {
    product_ids: product_ids.map((id) => Number(id)).filter((n) => !Number.isNaN(n)),
  });
  const products = response.data.data ?? [];
  return products.map(productToWishlistItem);
}
