/**
 * Checkout Service Type Definitions
 * 
 * These types handle the checkout flow where:
 * - Frontend sends raw cart items to backend
 * - Backend validates prices, stock, and vendor ownership
 * - Backend returns a checkout session or validation errors
 */

import { CartItem, CartItemOption, CartItemAddition } from "@/stores/cart/cart-types";

/**
 * Item sent to backend for checkout validation
 * Stripped down version of CartItem with only necessary fields
 */
export type CheckoutItem = {
  productId: string;
  storeId: string;
  quantity: number;
  selectedOptions: Pick<CartItemOption, 'id'>[];
  selectedAdditions: Pick<CartItemAddition, 'id'>[];
  /** Frontend price snapshot for comparison (backend will recalculate) */
  expectedUnitPrice: number;
};

/**
 * Checkout request payload
 */
export type CheckoutRequest = {
  items: CheckoutItem[];
  /** Optional customer notes */
  notes?: string;
  /** Delivery address (if applicable) */
  deliveryAddress?: DeliveryAddress;
};

/**
 * Delivery address for checkout
 */
export type DeliveryAddress = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  instructions?: string;
};

/**
 * Individual validation error for a cart item
 */
export type CheckoutItemError = {
  productId: string;
  storeId: string;
  errorType: 
    | 'PRICE_CHANGED'
    | 'OUT_OF_STOCK'
    | 'INSUFFICIENT_STOCK'
    | 'PRODUCT_NOT_FOUND'
    | 'STORE_MISMATCH'
    | 'PRODUCT_UNAVAILABLE'
    | 'OPTION_UNAVAILABLE'
    | 'ADDITION_UNAVAILABLE';
  message: string;
  /** For PRICE_CHANGED: the new price */
  newPrice?: number;
  /** For INSUFFICIENT_STOCK: available quantity */
  availableQuantity?: number;
};

/**
 * Vendor-level checkout information
 */
export type CheckoutVendorSummary = {
  vendorId: string;
  vendorName: string;
  itemCount: number;
  subtotal: number;
  deliveryFee?: number;
  estimatedDeliveryTime?: string;
};

/**
 * Successful checkout response
 */
export type CheckoutSession = {
  sessionId: string;
  expiresAt: string;
  vendors: CheckoutVendorSummary[];
  subtotal: number;
  totalDeliveryFee: number;
  tax: number;
  grandTotal: number;
  paymentMethods: PaymentMethod[];
};

/**
 * Available payment method
 */
export type PaymentMethod = {
  id: string;
  type: 'card' | 'wallet' | 'bank_transfer' | 'cash_on_delivery';
  name: string;
  icon?: string;
  enabled: boolean;
};

/**
 * Checkout validation response (when there are errors)
 */
export type CheckoutValidationResponse = {
  success: false;
  errors: CheckoutItemError[];
  /** Suggested actions for the user */
  suggestions?: string[];
};

/**
 * Successful checkout response
 */
export type CheckoutSuccessResponse = {
  success: true;
  session: CheckoutSession;
};

/**
 * Combined checkout response type
 */
export type CheckoutResponse = CheckoutValidationResponse | CheckoutSuccessResponse;

/**
 * Guest checkout prompt state
 */
export type GuestCheckoutState = {
  requiresAuth: boolean;
  redirectUrl?: string;
  message?: string;
};

/**
 * Payment confirmation request
 */
export type PaymentConfirmRequest = {
  sessionId: string;
  paymentMethodId: string;
  paymentDetails?: Record<string, unknown>;
};

/**
 * Order confirmation after successful payment
 */
export type OrderConfirmation = {
  orderId: string;
  orderNumber: string;
  status: 'confirmed' | 'processing' | 'pending_payment';
  vendors: {
    vendorId: string;
    vendorName: string;
    subOrderId: string;
    items: {
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    subtotal: number;
    deliveryFee: number;
    estimatedDelivery: string;
  }[];
  totals: {
    subtotal: number;
    deliveryFee: number;
    tax: number;
    grandTotal: number;
  };
  paymentMethod: string;
  createdAt: string;
};

/**
 * Payment confirmation response
 */
export type PaymentResponse = {
  success: boolean;
  order?: OrderConfirmation;
  error?: {
    code: string;
    message: string;
  };
};

/**
 * Convert CartItem to CheckoutItem for API submission
 */
export function cartItemToCheckoutItem(item: CartItem): CheckoutItem {
  return {
    productId: item.productId,
    storeId: item.storeId,
    quantity: item.quantity,
    selectedOptions: item.selectedOptions.map(opt => ({ id: opt.id })),
    selectedAdditions: item.selectedAdditions.map(add => ({ id: add.id })),
    expectedUnitPrice: item.unitPrice,
  };
}

/**
 * Convert all cart items to checkout items
 */
export function cartToCheckoutItems(items: CartItem[]): CheckoutItem[] {
  return items.map(cartItemToCheckoutItem);
}
