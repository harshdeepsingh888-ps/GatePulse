import {
  getAnalyticsOverview,
  getErrorAnalytics,
  getLatencyAnalytics,
  getRecentRequests,
  getTopApiKeys,
  getUsageTrend,
} from "../services/analytics.service.js";

import { successResponse } from "../shared/utils/apiResponse.js";

export async function overview(req, res, next) {
  try {
    const analytics = await getAnalyticsOverview();

    return successResponse(
      res,
      "Analytics overview retrieved successfully",
      analytics
    );
  } catch (error) {
    next(error);
  }
}

export async function topApiKeys(req, res, next) {
  try {
    const apiKeys = await getTopApiKeys();

    return successResponse(
      res,
      "Top API keys retrieved successfully",
      {
        apiKeys,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function recentRequests(req, res, next) {
  try {
    const requests = await getRecentRequests();

    return successResponse(
      res,
      "Recent requests retrieved successfully",
      {
        requests,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function usageTrend(req, res, next) {
  try {
    const trend = await getUsageTrend();

    return successResponse(
      res,
      "Usage trend retrieved successfully",
      {
        trend,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function errorAnalytics(req, res, next) {
  try {
    const errors = await getErrorAnalytics();

    return successResponse(
      res,
      "Error analytics retrieved successfully",
      errors
    );
  } catch (error) {
    next(error);
  }
}
export async function latencyAnalytics(req, res, next) {
  try {
    const latency = await getLatencyAnalytics();

    return successResponse(
      res,
      "Latency analytics retrieved successfully",
      latency
    );
  } catch (error) {
    next(error);
  }
}