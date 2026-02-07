export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: number;
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at?: string;
  /** Optional display fields; adjust to match backend */
  order_number?: string;
  item_count?: number;
};
