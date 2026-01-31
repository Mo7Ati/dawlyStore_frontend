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

      // ============ ACTIONS ============

      addItem: (payload: AddToCartPayload) => {
        const {
          productId,
          productName,
          productImageUrl,
          storeId,
          storeName,
          unitPrice,
          comparePrice,
          discountPercentage,
          quantity,
          selectedOptions = [],
          selectedAdditions = [],
        } = payload;

        const cartItemId = generateCartItemId(
          productId,
          storeName,
          selectedOptions,
          selectedAdditions
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
            productId,
            productName,
            productImageUrl,
            storeId,
            storeName,
            unitPrice,
            comparePrice,
            discountPercentage,
            quantity,
            selectedOptions,
            selectedAdditions,
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

      removeStoreItems: (storeId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.storeId !== storeId),
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
        lastUpdated: state.lastUpdated,
      }),
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
    const storeItems = storeMap.get(item.storeId) || [];
    storeItems.push(item);
    storeMap.set(item.storeId, storeItems);
  }

  // Build store groups with computed subtotals
  const storeGroups: StoreCartGroup[] = [];
  let grandTotal = 0;
  let totalItems = 0;

  for (const [storeId, storeItems] of storeMap) {
    const subtotal = calculateStoreSubtotal(storeItems);
    const itemCount = storeItems.reduce((sum, item) => sum + item.quantity, 0);

    storeGroups.push({
      storeId,
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
export function useStoreItems(storeId: string): CartItem[] {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(
    () => items.filter((item) => item.storeId === storeId),
    [items, storeId]
  );
}

/**
 * Check if a product is in cart (by productId and storeId)
 */
export function useIsInCart(productId: string, storeId: string): boolean {
  return useCart((state) =>
    state.items.some(
      (item) => item.productId === productId && item.storeId === storeId
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
export function useCartStores(): { storeId: string; storeName: string }[] {
  const items = useCart(useShallow((state) => state.items));

  return useMemo(() => {
    const storeMap = new Map<string, string>();
    for (const item of items) {
      storeMap.set(item.storeId, item.storeName);
    }
    return Array.from(storeMap.entries()).map(([storeId, storeName]) => ({
      storeId,
      storeName,
    }));
  }, [items]);
}
