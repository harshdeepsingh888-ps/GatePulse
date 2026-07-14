import {
  Activity,
  KeyRound,
  ShieldAlert,
  Timer,
} from "lucide-react";

import type {
  AnalyticsOverview,
  LatencyAnalytics,
} from "@/services/analytics.service";

type GatewayHealthProps = {
  overview?: AnalyticsOverview;
  latency?: LatencyAnalytics;
};

export function GatewayHealth({
  overview,
  latency,
}: GatewayHealthProps) {
  const isHealthy =
    overview !== undefined &&
    latency !== undefined &&
    latency.averageLatencyMs < 1000;

  const stats = [
    {
      label: "Active API Keys",
      value: overview?.activeApiKeys.toLocaleString() ?? "--",
      icon: KeyRound,
    },
    {
      label: "Blocked Requests",
      value: overview?.blockedRequests.toLocaleString() ?? "--",
      icon: ShieldAlert,
    },
    {
      label: "Average Latency",
      value: latency
        ? `${latency.averageLatencyMs.toLocaleString()} ms`
        : "--",
      icon: Timer,
    },
    {
      label: "Total Requests",
      value: overview?.totalRequests.toLocaleString() ?? "--",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-4">
        <div>
          <p className="text-sm font-medium">Gateway status</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Based on current latency and service availability
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={
              isHealthy
                ? "size-2.5 rounded-full bg-emerald-500"
                : "size-2.5 rounded-full bg-amber-500"
            }
          />

          <span
            className={
              isHealthy
                ? "text-sm font-semibold text-emerald-600"
                : "text-sm font-semibold text-amber-600"
            }
          >
            {isHealthy ? "Healthy" : "Checking"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border border-border/60 p-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>

                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>

              <span className="text-sm font-semibold">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}