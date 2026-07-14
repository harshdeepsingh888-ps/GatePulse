import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";

export type AnalyticsOverview = {
  totalRequests: number;
  blockedRequests: number;
  averageLatency: number;
  activeApiKeys: number;
};

export type TopApiKey = {
  id: string;
  name: string;
  tier: string;
  isActive: boolean;
  totalRequests: number;
};

export type RecentRequest = {
  id: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTimeMs: number;
  ipAddress: string | null;
  userAgent: string | null;
  wasBlocked: boolean;
  blockReason: string | null;
  createdAt: string;
  apiKey: {
    id: string;
    name: string;
    keyPrefix: string;
    tier: string;
  };
};

export type UsageTrendPoint = {
  timestamp: string;
  totalRequests: number;
  blockedRequests: number;
};

export type ErrorAnalytics = {
  totalErrors: number;
  statusBreakdown: Array<{
    statusCode: number;
    count: number;
  }>;
};

export type LatencyAnalytics = {
  averageLatencyMs: number;
  minimumLatencyMs: number;
  maximumLatencyMs: number;
};

type TopApiKeysResponse = {
  apiKeys: TopApiKey[];
};

type RecentRequestsResponse = {
  requests: RecentRequest[];
};

type UsageTrendResponse = {
  trend: UsageTrendPoint[];
};

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const response =
    await apiClient.get<ApiSuccessResponse<AnalyticsOverview>>(
      "/analytics/overview",
    );

  return response.data.data;
}

export async function getTopApiKeys(): Promise<TopApiKey[]> {
  const response =
    await apiClient.get<ApiSuccessResponse<TopApiKeysResponse>>(
      "/analytics/top-api-keys",
    );

  return response.data.data.apiKeys;
}

export async function getRecentRequests(): Promise<RecentRequest[]> {
  const response =
    await apiClient.get<ApiSuccessResponse<RecentRequestsResponse>>(
      "/analytics/recent-requests",
    );

  return response.data.data.requests;
}

export async function getUsageTrend(): Promise<UsageTrendPoint[]> {
  const response =
    await apiClient.get<ApiSuccessResponse<UsageTrendResponse>>(
      "/analytics/usage-trend",
    );

  return response.data.data.trend;
}

export async function getErrorAnalytics(): Promise<ErrorAnalytics> {
  const response =
    await apiClient.get<ApiSuccessResponse<ErrorAnalytics>>(
      "/analytics/errors",
    );

  return response.data.data;
}

export async function getLatencyAnalytics(): Promise<LatencyAnalytics> {
  const response =
    await apiClient.get<ApiSuccessResponse<LatencyAnalytics>>(
      "/analytics/latency",
    );

  return response.data.data;
}
