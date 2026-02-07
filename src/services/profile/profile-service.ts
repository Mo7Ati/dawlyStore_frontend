import api from "@/lib/api";
import type { Customer } from "@/types/auth";
import { Response } from "@/types/general";

export type UpdateProfileData = {
  name?: string;
  email?: string;
  phone?: string;
};

/**
 * Update current customer profile
 */
export async function updateProfile(data: UpdateProfileData): Promise<Response<Customer>> {
  const response = await api.put<Response<Customer>>("/profile", data);
  return response.data;
}
