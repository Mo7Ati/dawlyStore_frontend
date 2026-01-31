import api from "@/lib/api";
import {
  CheckoutRequest,
  CheckoutResponse,
  PaymentConfirmRequest,
  PaymentResponse,
  cartToCheckoutItems,
} from "./checkout-types";
import { CartItem } from "@/stores/cart/cart-types";

/**
 * Checkout Service
 * 
 * Handles all checkout-related API calls.
 * Backend is responsible for:
 * - Validating prices (recalculating from database)
 * - Checking stock availability
 * - Verifying vendor ownership
 * - Creating checkout sessions
 * - Processing payments
 */

/**
 * Initiate checkout with cart items
 * Backend will validate all items and return a session or errors
 */
export async function initiateCheckout(
  items: CartItem[],
  notes?: string
): Promise<CheckoutResponse> {
  const request: CheckoutRequest = {
    items: cartToCheckoutItems(items),
    notes,
  };

  const response = await api.post<CheckoutResponse>("/checkout/initiate", request);
  return response.data;
}

/**
 * Validate cart items without creating a session
 * Useful for pre-checkout validation
 */
export async function validateCartItems(
  items: CartItem[]
): Promise<CheckoutResponse> {
  const request: CheckoutRequest = {
    items: cartToCheckoutItems(items),
  };

  const response = await api.post<CheckoutResponse>("/checkout/validate", request);
  return response.data;
}

/**
 * Get checkout session details
 */
export async function getCheckoutSession(
  sessionId: string
): Promise<CheckoutResponse> {
  const response = await api.get<CheckoutResponse>(`/checkout/session/${sessionId}`);
  return response.data;
}

/**
 * Confirm payment for a checkout session
 */
export async function confirmPayment(
  request: PaymentConfirmRequest
): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>("/checkout/pay", request);
  return response.data;
}

/**
 * Cancel a checkout session
 */
export async function cancelCheckout(sessionId: string): Promise<void> {
  await api.post(`/checkout/cancel/${sessionId}`);
}

/**
 * Check if user is authenticated for checkout
 * Returns auth status and redirect URL if not authenticated
 */
export async function checkAuthForCheckout(): Promise<{
  isAuthenticated: boolean;
  redirectUrl?: string;
}> {
  try {
    const response = await api.get<{ isAuthenticated: boolean }>("/auth/status");
    return {
      isAuthenticated: response.data.isAuthenticated,
      redirectUrl: response.data.isAuthenticated ? undefined : "/login?redirect=/checkout",
    };
  } catch {
    return {
      isAuthenticated: false,
      redirectUrl: "/login?redirect=/checkout",
    };
  }
}
