"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import {
  CartStore,
  CartItem,
  CartSummary,
  StoreCartGroup,
  AddToCartPayload,
  generateCartItemId,
  calculateItemTotal,
  calculateStoreSubtotal,
} from "./cart-types";

/**
 * Multi-Store Cart Store
 * 
 * Features:
 * - Persistent storage via localStorage
 * - Multiple stores in single cart
 * - Automatic store group cleanup when last item removed
 * - Computed derived data (grouping, subtotals, grand total)
 * - Guest cart support (no auth required)
 */
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // ============ STATE ============
      items: [],
      lastUpdated: Date.now(),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      // ============ ACTIONS ============

      addItem: (payload: AddToCartPayload) => {
        const {
          product_id,
          productName,
          productImageUrl,
          store_id,
          storeName,
          unitPrice,
          comparePrice,
          discountPercentage,
          quantity,
          selected_options = [],
          selected_additions = [],
        } = payload;

        const cartItemId = generateCartItemId(
          product_id,
          storeName,
          selected_options,
          selected_additions
        );

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.cartItemId === cartItemId
          );

          if (existingItemIndex !== -1) {
            // Merge: Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
              // Update price snapshot in case it changed
              unitPrice,
              comparePrice,
              discountPercentage,
            };
            return { items: updatedItems, lastUpdated: Date.now() };
          }

          // Add new item
          const newItem: CartItem = {
            cartItemId,
            product_id,
            productName,
            productImageUrl,
            store_id,
            storeName,
            unitPrice,
            comparePrice,
            discountPercentage,
            quantity,
            selected_options,
            selected_additions,
            addedAt: Date.now(),
          };

          return { items: [...state.items, newItem], lastUpdated: Date.now() };
        });
      },

      removeItem: (cartItemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
          lastUpdated: Date.now(),
        }));
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
          lastUpdated: Date.now(),
        }));
      },

      incrementQuantity: (cartItemId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          lastUpdated: Date.now(),
        }));
      },

      decrementQuantity: (cartItemId: string) => {
        const item = get().items.find((i) => i.cartItemId === cartItemId);
        if (!item) return;

        if (item.quantity <= 1) {
          get().removeItem(cartItemId);
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.cartItemId === cartItemId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
            lastUpdated: Date.now(),
          }));
        }
      },

      removeStoreItems: (store_id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.store_id !== store_id),
          lastUpdated: Date.now(),
        }));
      },

      clearCart: () => {
        set({ items: [], lastUpdated: Date.now() });
      },

      getCheckoutItems: () => {
        return get().items;
      },
    }),
    {
      name: "multivendor-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        items: state.items,
        hydrated: state.hydrated,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
);

// ============ SELECTORS ============
// Use these for optimized re-renders - only subscribe to what you need

/**
 * Helper function to compute cart summary from items
 * Extracted to avoid recreating in useMemo
 */
function computeCartSummary(items: CartItem[]): CartSummary {
  if (items.length === 0) {
    return {
      items: [],
      storeGroups: [],
      grandTotal: 0,
      totalItems: 0,
      totalUniqueItems: 0,
      storeCount: 0,
      isEmpty: true,
    };
  }

  // Group items by store
  const storeMap = new Map<string, CartItem[]>();

  for (const item of items) {
    const storeItems = storeMap.get(item.store_id) || [];
    storeItems.push(item);
    storeMap.set(item.store_id, storeItems);
  }

  // Build store groups with computed subtotals
  const storeGroups: StoreCartGroup[] = [];
  let grandTotal = 0;
  let totalItems = 0;

  for (const [store_id, storeItems] of storeMap) {
    const subtotal = calculateStoreSubtotal(storeItems);
    const itemCount = storeItems.reduce((sum, item) => sum + item.quantity, 0);

    storeGroups.push({
      store_id,
      storeName: storeItems[0].storeName,
      items: storeItems,
      subtotal,
      itemCount,
    });

    grandTotal += subtotal;
    totalItems += itemCount;
  }

  // Sort store groups by most recently added item
  storeGroups.sort((a, b) => {
    const aLatest = Math.max(...a.items.map((i) => i.addedAt));
    const bLatest = Math.max(...b.items.map((i) => i.addedAt));
    return bLatest - aLatest;
  });

  return {
    items,
    storeGroups,
    grandTotal,
    totalItems,
    totalUniqueItems: items.length,
    storeCount: storeGroups.length,
    isEmpty: false,
  };
}

/**
 * Get computed cart summary with store grouping
 * Uses useShallow for stable reference and useMemo for computed values
 */
export function useCartSummary(): CartSummary {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(() => computeCartSummary(items), [items]);
}

/**
 * Get total item count (for cart icon badge)
 */
export function useCartItemCount(): number {
  return useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
}

/**
 * Get cart grand total
 */
export function useCartTotal(): number {
  return useCart((state) =>
    state.items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  );
}

/**
 * Check if cart is empty
 */
export function useIsCartEmpty(): boolean {
  return useCart((state) => state.items.length === 0);
}

/**
 * Get items for a specific store
 */
export function useStoreItems(store_id: string): CartItem[] {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(
    () => items.filter((item) => item.store_id === store_id),
    [items, store_id]
  );
}

/**
 * Check if a product is in cart (by product_id and store_id)
 */
export function useIsInCart(product_id: string, store_id: string): boolean {
  return useCart((state) =>
    state.items.some(
      (item) => item.product_id === product_id && item.store_id === store_id
    )
  );
}

/**
 * Get specific cart item
 */
export function useCartItem(cartItemId: string): CartItem | undefined {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(
    () => items.find((item) => item.cartItemId === cartItemId),
    [items, cartItemId]
  );
}

/**
 * Get all stores in cart
 */
export function useCartStores(): { store_id: string; storeName: string }[] {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(() => {
    const storeMap = new Map<string, string>();
    for (const item of items) {
      storeMap.set(item.store_id, item.storeName);
    }
    return Array.from(storeMap.entries()).map(([store_id, storeName]) => ({
      store_id,
      storeName,
    }));
  }, [items]);
}

/**
 * Check if cart is hydrated
 */
export function useCartHydrated(): boolean {
  return useCart((state) => state.hydrated)
}
