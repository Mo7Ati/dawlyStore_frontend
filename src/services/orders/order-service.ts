import api from "@/lib/api";
import type { Order } from "@/types/order";
import type { Response } from "@/types/general";

/**
 * Fetch all orders for the authenticated customer
 */
export async function getOrders(): Promise<Response<Order[]>> {
  const response = await api.get<Response<Order[]>>("/orders");
  return response.data;
}
