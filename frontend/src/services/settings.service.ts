import { apiClient } from "@/lib/api-client";

export interface SettingsOverview {
  environment: string;
  version: string;
  defaultApiTier: string;
  rateLimitingEnabled: boolean;
  requestLoggingEnabled: boolean;
  authentication: {
    type: string;
    sessionStatus: string;
  };
}

export async function getSettings() {
  const response = await apiClient.get("/settings");

  return response.data.data as SettingsOverview;
}