import api from "@/lib/api";
import type { Order } from "@/types/order";
import type { CustomerOrdersData } from "@/types/order";
import type { Response } from "@/types/general";

/**
 * Fetch all orders for the authenticated customer (grouped by checkout).
 * Each group represents one checkout with one or more store orders.
 */
export async function getOrders(): Promise<Response<CustomerOrdersData>> {
  const response = await api.get<Response<CustomerOrdersData>>("/orders");
  return response.data;
}
