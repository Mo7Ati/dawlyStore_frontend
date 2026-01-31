/**
 * Multi-Store Cart Type Definitions
 * 
 * These types support a fully frontend-managed cart system where:
 * - Cart items are grouped by store
 * - Prices are snapshots for UI display only (backend validates at checkout)
 * - Items are uniquely identified by productId + StoreId + options hash
 */

/**
 * Selected option for a cart item (e.g., size, color)
 */
export type CartItemOption = {
  id: string;
  name: string;
  price: number;
};

/**
 * Selected addition for a cart item (e.g., extra toppings)
 */
export type CartItemAddition = {
  id: string;
  name: string;
  price: number;
};

/**
 * Store information snapshot at time of adding to cart
 */
export type StoreInfo = {
  id: string;
  name: string;
  imageUrl?: string;
};

/**
 * Individual cart item with all necessary data for display and checkout
 * Price is a snapshot - backend will recalculate during checkout
 */
export type CartItem = {
  /** Unique identifier for this cart item (generated from product + store + options) */
  cartItemId: string;
  
  /** Product information */
  productId: string;
  productName: string;
  productImageUrl: string;
  
  /** Store information */
  storeId: string;
  storeName: string;
  
  /** Pricing (UI display only - backend recalculates) */
  unitPrice: number;
  comparePrice?: number | null;
  discountPercentage?: number | null;
  
  /** Quantity */
  quantity: number;
  
  /** Selected options and additions */
  selectedOptions: CartItemOption[];
  selectedAdditions: CartItemAddition[];
  
  /** Timestamp when item was added */
  addedAt: number;
};

/**
 * Data needed to add an item to the cart
 */
export type AddToCartPayload = {
  productId: string;
  productName: string;
  productImageUrl: string;
  storeId: string;
  storeName: string;
  unitPrice: number;
  comparePrice?: number | null;
  discountPercentage?: number | null;
  quantity: number;
  selectedOptions?: CartItemOption[];
  selectedAdditions?: CartItemAddition[];
};

/**
 * Cart items grouped by store with computed subtotal
 */
export type StoreCartGroup = {
  storeId: string;
  storeName: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
};

/**
 * Computed cart summary for display
 */
export type CartSummary = {
  storeGroups: StoreCartGroup[];
  grandTotal: number;
  totalItems: number;
  totalUniqueItems: number;
  storeCount: number;
  items: CartItem[];
  isEmpty: boolean;
};

/**
 * Cart state stored in Zustand
 * Only stores flat items array - grouping is computed
 */
export type CartState = {
  items: CartItem[];
  lastUpdated: number;
};

/**
 * Cart actions for Zustand store
 */
export type CartActions = {
  /** Add item to cart (merges if same product+store+options) */
  addItem: (payload: AddToCartPayload) => void;
  
  /** Remove item from cart by cartItemId */
  removeItem: (cartItemId: string) => void;
  
  /** Update quantity for an item */
  updateQuantity: (cartItemId: string, quantity: number) => void;
  
  /** Increment quantity by 1 */
  incrementQuantity: (cartItemId: string) => void;
  
  /** Decrement quantity by 1 (removes if quantity becomes 0) */
  decrementQuantity: (cartItemId: string) => void;
  
  /** Remove all items from a specific store */
  removeStoreItems: (storeId: string) => void;
  
  /** Clear entire cart */
  clearCart: () => void;
  
  /** Get raw items for checkout submission */
  getCheckoutItems: () => CartItem[];
};

/**
 * Combined Zustand store type
 */
export type CartStore = CartState & CartActions;

/**
 * Generates a unique cart item ID from product, store, and options
 * This ensures items with different options are treated as separate items
 */
export function generateCartItemId(
  productId: string,
  storeName: string,
  options: CartItemOption[],
  additions: CartItemAddition[]
): string {
  const optionIds = options.map(o => o.id).sort().join('_');
  const additionIds = additions.map(a => a.id).sort().join('_');
  return `${productId}-${storeName}-${optionIds}-${additionIds}`;
}

/**
 * Calculate total price for a cart item including options and additions
 */
export function calculateItemTotal(item: CartItem): number {
  const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const additionsTotal = item.selectedAdditions.reduce((sum, add) => sum + add.price, 0);
  return (item.unitPrice + optionsTotal + additionsTotal) * item.quantity;
}

/**
 * Calculate store subtotal from items
 */
export function calculateStoreSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}
