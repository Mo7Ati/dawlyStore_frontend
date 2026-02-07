import { Product } from "./product";

export type OrderStatus = {
  value: string;
  label: string;
};

export type PaymentStatus = {
  value: string;
  label: string;
};

export type Order = {
  id: number;
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at?: string;
  order_number?: string;
  item_count?: number;
};

/** Store summary as returned in order history */
export type OrderStore = {
  id: number | string;
  name: string;
  image_url?: string;
  address?: string | null;
};

/** Line item in a customer order */
export type OrderItem = {
  id?: number;
  product_id?: string | number;
  product_data: Product;
  product: Product;
  quantity: number;
  unit_price: number;
};

/** Single order (per store) in a checkout group */
export type CustomerOrder = {
  id: number;
  store_id: number;
  store: OrderStore;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  order_number?: string;
  created_at?: string;
};

/** One checkout group (one payment, multiple store orders) */
export type CheckoutGroup = {
  checkout_group_id: string;
  created_at: string;
  group_total: number;
  orders_count: number;
  orders: CustomerOrder[];
};

/** API response for customer orders history */
export type CustomerOrdersData = {
  groups: CheckoutGroup[];
};
