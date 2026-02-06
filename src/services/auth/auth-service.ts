import api from "@/lib/client-api";
import type {
  LoginCredentials,
  RegisterData,
  Customer,
} from "@/types/auth";
import { Response } from "@/types/general";

/**
 * Login with email and password
 * Laravel sets the JWT token as an HTTP-only cookie
 */
export async function login(credentials: LoginCredentials): Promise<Response<Customer>> {
  const response = await api.post<Response<Customer>>("/login", credentials);
  return response.data;
}

/**
 * Register a new customer
 * Laravel sets the JWT token as an HTTP-only cookie
 */
export async function register(data: RegisterData): Promise<Response<Customer>> {
  const response = await api.post<Response<Customer>>("/register", data);
  return response.data;
}

/**
 * Logout the current customer
 * Laravel clears the HTTP-only cookie
 */
export async function logout(): Promise<void> {
  await api.post("/logout");
}

/**
 * Check if user is authenticated
 * Returns customer data if authenticated, null otherwise
 */
export async function checkAuth(): Promise<Response<Customer>> {
  const response = await api.get<Response<Customer>>("/me");
  return response.data;
}
