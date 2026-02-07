/**
 * Checkout Service Type Definitions
 *
 * Flow:
 * - Frontend sends cart items + address_id to backend
 * - Backend validates prices, stock, and vendor ownership
 * - Backend creates a Stripe checkout session and returns the URL
 * - Frontend redirects the user to Stripe
 */

import { CartItem, CartItemOption, CartItemAddition } from "@/stores/cart/cart-types";

/**
 * Item sent to backend for checkout
 */
export type CheckoutItem = {
  product_id: string;
  store_id: string;
  quantity: number;
  selected_options: Pick<CartItemOption, "id">[];
  selected_additions: Pick<CartItemAddition, "id">[];
  /** Frontend price snapshot for comparison (backend will recalculate) */
  unit_price: number;
};

/**
 * Checkout request payload
 */
export type CheckoutRequest = {
  items: CheckoutItem[];
  address_id: number;
  notes?: string;
};

/**
 * Checkout response from backend — a Stripe session URL
 */
export type CheckoutResponse = {
  checkout_url: string;
};

/**
 * Convert CartItem to CheckoutItem for API submission
 */
export function cartItemToCheckoutItem(item: CartItem): CheckoutItem {
  return {
    product_id: item.product_id,
    store_id: item.store_id,
    quantity: item.quantity,
    selected_options: item.selected_options.map((opt) => ({ id: opt.id })),
    selected_additions: item.selected_additions.map((add) => ({ id: add.id })),
    unit_price: item.unitPrice,
  };
}

/**
 * Convert all cart items to checkout items
 */
export function cartToCheckoutItems(items: CartItem[]): CheckoutItem[] {
  return items.map(cartItemToCheckoutItem);
}
