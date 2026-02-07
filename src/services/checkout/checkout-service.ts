import api from "@/lib/api";
import {
  CheckoutRequest,
  CheckoutResponse,
  cartToCheckoutItems,
} from "./checkout-types";
import { CartItem } from "@/stores/cart/cart-types";
import { Response } from "@/types/general";

/**
 * Checkout Service
 *
 * Sends cart items + address_id to the backend.
 * Backend validates everything and creates a Stripe checkout session.
 * Returns the Stripe session URL for redirect.
 */

/**
 * Initiate checkout — returns a Stripe session URL
 */
export async function initiateCheckout(
  items: CartItem[],
  addressId: number,
  notes?: string
): Promise<Response<CheckoutResponse>> {
  const request: CheckoutRequest = {
    items: cartToCheckoutItems(items),
    address_id: addressId,
    notes,
  };

  const response = await api.post<Response<CheckoutResponse>>("/checkout", request);
  return response.data;
}
