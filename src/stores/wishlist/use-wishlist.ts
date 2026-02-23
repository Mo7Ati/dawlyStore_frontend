"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";
import type { WishlistStore, WishlistItem } from "./wishlist-types";
import {
  fetchWishlist,
  addToWishlistApi,
  removeFromWishlistApi,
  syncWishlistApi,
} from "@/services/wishlist/wishlist-service";

const STORAGE_KEY = "multivendor-wishlist";

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastUpdated: Date.now(),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      setItems: (items: WishlistItem[]) => {
        set({ items, lastUpdated: Date.now() });
      },

      addItem: (item: WishlistItem) => {
        const { items } = get();
        if (items.some((i) => i.product_id === item.product_id && i.store_id === item.store_id)) {
          return;
        }
        set({ items: [...items, item], lastUpdated: Date.now() });
      },

      removeItem: (product_id: string, store_id: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product_id === product_id && i.store_id === store_id)
          ),
          lastUpdated: Date.now(),
        }));
      },

      toggleItem: (item: WishlistItem) => {
        const { items } = get();
        const exists = items.some(
          (i) => i.product_id === item.product_id && i.store_id === item.store_id
        );
        if (exists) {
          get().removeItem(item.product_id, item.store_id);
          return false;
        }
        get().addItem(item);
        return true;
      },

      syncFromServer: async () => {
        try {
          const items = await fetchWishlist();
          set({ items, lastUpdated: Date.now() });
        } catch {
          // Not logged in or API error; leave local state as-is
        }
      },

      mergeLocalToServerThenSync: async () => {
        try {
          const { items } = get();
          const product_ids = items.map((i) => i.product_id);
          if (product_ids.length === 0) {
            await get().syncFromServer();
            return;
          }
          const synced = await syncWishlistApi(product_ids);
          set({ items: synced, lastUpdated: Date.now() });
        } catch {
          await get().syncFromServer();
        }
      },

      clear: () => set({ items: [], lastUpdated: Date.now() }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Selectors
export function useWishlistItems(): WishlistItem[] {
  return useWishlistStore(useShallow((s) => s.items));
}

export function useWishlistCount(): number {
  return useWishlistStore((s) => s.items.length);
}

export function useIsInWishlist(product_id: string, store_id: string): boolean {
  return useWishlistStore((s) =>
    s.items.some((i) => i.product_id === product_id && i.store_id === store_id)
  );
}

export function useWishlistHydrated(): boolean {
  return useWishlistStore((s) => s.hydrated);
}

/**
 * Hook that returns add/remove actions with API sync when logged in.
 * Optimistic update; reverts and toasts on API failure.
 */
export function useWishlistActions(isLoggedIn: boolean) {
  const addItemLocal = useWishlistStore((s) => s.addItem);
  const removeItemLocal = useWishlistStore((s) => s.removeItem);
  const getItems = useWishlistStore.getState;

  const addItem = async (item: WishlistItem) => {
    const prev = [...getItems().items];
    addItemLocal(item);
    if (isLoggedIn) {
      try {
        await addToWishlistApi(item.product_id);
      } catch {
        getItems().setItems(prev);
        toast.error("Could not update wishlist. Try again.");
      }
    }
  };

  const removeItem = async (product_id: string, store_id: string) => {
    const prev = [...getItems().items];
    removeItemLocal(product_id, store_id);
    if (isLoggedIn) {
      try {
        await removeFromWishlistApi(product_id);
      } catch {
        getItems().setItems(prev);
        toast.error("Could not update wishlist. Try again.");
      }
    }
  };

  const toggleItem = async (item: WishlistItem) => {
    const inList = getItems().items.some(
      (i) => i.product_id === item.product_id && i.store_id === item.store_id
    );
    if (inList) {
      await removeItem(item.product_id, item.store_id);
      return false;
    }
    await addItem(item);
    return true;
  };

  return { addItem, removeItem, toggleItem };
}
