import { apiClient } from "@/lib/api-client";
import type {
  ApiSuccessResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/api";

export async function login(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response =
    await apiClient.post<ApiSuccessResponse<LoginResponse>>(
      "/auth/login",
      credentials,
    );

  return response.data.data;
}

export function logout() {
  localStorage.removeItem("gatepulse_access_token");
}

export function saveAccessToken(token: string) {
  localStorage.setItem("gatepulse_access_token", token);
}

export function getAccessToken() {
  return localStorage.getItem("gatepulse_access_token");
}