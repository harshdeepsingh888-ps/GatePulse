import { useQueries } from "@tanstack/react-query";

import {
  getAnalyticsOverview,
  getErrorAnalytics,
  getLatencyAnalytics,
  getRecentRequests,
  getTopApiKeys,
  getUsageTrend,
} from "@/services/analytics.service";

export function useDashboardAnalytics() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["analytics", "overview"],
        queryFn: getAnalyticsOverview,
      },
      {
        queryKey: ["analytics", "top-api-keys"],
        queryFn: getTopApiKeys,
      },
      {
        queryKey: ["analytics", "recent-requests"],
        queryFn: getRecentRequests,
      },
      {
        queryKey: ["analytics", "usage-trend"],
        queryFn: getUsageTrend,
      },
      {
        queryKey: ["analytics", "errors"],
        queryFn: getErrorAnalytics,
      },
      {
        queryKey: ["analytics", "latency"],
        queryFn: getLatencyAnalytics,
      },
    ],
  });

  const [
    overviewQuery,
    topApiKeysQuery,
    recentRequestsQuery,
    usageTrendQuery,
    errorsQuery,
    latencyQuery,
  ] = results;

  return {
    overviewQuery,
    topApiKeysQuery,
    recentRequestsQuery,
    usageTrendQuery,
    errorsQuery,
    latencyQuery,
    isPending: results.some((query) => query.isPending),
    isError: results.some((query) => query.isError),
  };
}
