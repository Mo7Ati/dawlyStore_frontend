import api from "@/lib/api";
import { Address, CreateAddressData } from "@/types/address";
import { Response } from "@/types/general";

/**
 * Fetch all saved addresses for the authenticated customer
 */
export async function getAddresses(): Promise<Response<Address[]>> {
  const response = await api.get<Response<Address[]>>("/addresses");
  return response.data;
}

/**
 * Create a new address
 */
export async function createAddress(data: CreateAddressData): Promise<Response<Address>> {
  const response = await api.post<Response<Address>>("/addresses", data);
  return response.data;
}

/**
 * Edit an address by ID. Sends the full address payload (all fields).
 */
export async function editAddress(id: number, data: Address): Promise<Response<Address>> {
  const response = await api.put<Response<Address>>(`/addresses/${id}`, data);
  return response.data;
}

/**
 * Delete an address by ID
 */
export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/addresses/${id}`);
}
