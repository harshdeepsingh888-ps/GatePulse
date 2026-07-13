import { apiClient } from "@/lib/api-client";
import type { ApiKey, ApiSuccessResponse } from "@/types/api";

export type CreateApiKeyRequest = {
  name: string;
  tier: string;
  requestsPerMinute: number;
  expiresAt?: string | null;
};

export type CreateApiKeyResponse = {
  apiKey: string;
  details: ApiKey;
};

type ApiKeysListResponse = {
  apiKeys: ApiKey[];
  total: number;
};

export async function getApiKeys(): Promise<ApiKey[]> {
  const response =
    await apiClient.get<ApiSuccessResponse<ApiKeysListResponse>>(
      "/api-keys",
    );

  return response.data.data.apiKeys;
}

export async function createApiKey(
  payload: CreateApiKeyRequest,
): Promise<CreateApiKeyResponse> {
  const response =
    await apiClient.post<ApiSuccessResponse<CreateApiKeyResponse>>(
      "/api-keys",
      payload,
    );

  return response.data.data;
}

export async function revokeApiKey(id: string): Promise<ApiKey> {
  const response =
    await apiClient.patch<ApiSuccessResponse<ApiKey>>(
      `/api-keys/${id}/revoke`,
    );

  return response.data.data;
}

export async function regenerateApiKey(
  id: string,
): Promise<CreateApiKeyResponse> {
  const response =
    await apiClient.post<ApiSuccessResponse<CreateApiKeyResponse>>(
      `/api-keys/${id}/regenerate`,
    );

  return response.data.data;
}