import {
  Activity,
  Clock3,
  KeyRound,
  ShieldAlert,
} from "lucide-react";

import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { useDashboardAnalytics } from "@/features/analytics/hooks/use-dashboard-analytics";
import { RecentRequestsTable } from "@/components/dashboard/recent-requests-table";

export function DashboardPage() {
  const analytics = useDashboardAnalytics();

  const overview = analytics.overviewQuery.data;
  const errors = analytics.errorsQuery.data;
  const latency = analytics.latencyQuery.data;

  const errorRate =
    overview && overview.totalRequests > 0
      ? ((errors?.totalErrors ?? 0) / overview.totalRequests) * 100
      : 0;

  const metrics = [
    {
      label: "Total Requests",
      value: overview
        ? overview.totalRequests.toLocaleString()
        : "--",
      change: "Live",
      trend: "up",
      description: "all recorded requests",
      icon: Activity,
      tone: "neutral",
    },
    {
      label: "Avg. Latency",
      value: latency
        ? `${latency.averageLatencyMs.toLocaleString()} ms`
        : "--",
      change: "Live",
      trend: "down",
      description: "average response time",
      icon: Clock3,
      tone: "warning",
    },
    {
      label: "Error Rate",
      value: overview
        ? `${errorRate.toFixed(2)}%`
        : "--",
      change: "Live",
      trend: "down",
      description: "requests with errors",
      icon: ShieldAlert,
      tone: "danger",
    },
    {
      label: "Active API Keys",
      value: overview
        ? overview.activeApiKeys.toLocaleString()
        : "--",
      change: "Live",
      trend: "up",
      description: "currently enabled keys",
      icon: KeyRound,
      tone: "success",
    },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Good evening, Harshdeep
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Your API Gateway is{" "}
            <span className="font-medium text-emerald-500">healthy</span> and
            running smoothly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Last 24 hours
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">
            <span className="size-2 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            description={metric.description}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <ChartCard
          title="Traffic Trend"
          description="API requests over the last 24 hours"
        >
          <TrafficChart
  data={analytics.usageTrendQuery.data ?? []}
/>
        </ChartCard>

        <SectionCard
  title="Top API Keys"
  description="Highest traffic consumers during the selected period"
  className="min-h-96"
>
  {analytics.topApiKeysQuery.isPending && (
    <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
      Loading API key rankings...
    </div>
  )}

  {analytics.topApiKeysQuery.isError && (
    <div className="flex min-h-72 items-center justify-center text-sm text-destructive">
      Unable to load API key rankings.
    </div>
  )}

  {analytics.topApiKeysQuery.isSuccess &&
    analytics.topApiKeysQuery.data.length === 0 && (
      <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
        No API key usage recorded yet.
      </div>
    )}

  {analytics.topApiKeysQuery.isSuccess &&
    analytics.topApiKeysQuery.data.length > 0 && (
      <div className="space-y-3">
        {analytics.topApiKeysQuery.data.slice(0, 5).map((apiKey, index) => (
          <div
            key={apiKey.id}
            className="flex items-center gap-3 rounded-xl border border-border/70 p-3"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
              {index + 1}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-medium">
                  {apiKey.name}
                </p>

                <p className="shrink-0 text-sm font-semibold">
                  {apiKey.totalRequests.toLocaleString()}
                </p>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{apiKey.tier}</span>
                <span>•</span>
                <span>
                  {apiKey.isActive ? "Active" : "Revoked"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
</SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard
  title="Recent Requests"
  description="Latest requests processed by the gateway"
  className="min-h-72 xl:col-span-2"
>
  {analytics.recentRequestsQuery.isPending && (
    <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
      Loading recent requests...
    </div>
  )}

  {analytics.recentRequestsQuery.isError && (
    <div className="flex min-h-48 items-center justify-center text-sm text-destructive">
      Unable to load recent requests.
    </div>
  )}

  {analytics.recentRequestsQuery.isSuccess && (
    <RecentRequestsTable
      requests={analytics.recentRequestsQuery.data.slice(0, 8)}
    />
  )}
</SectionCard>

        <SectionCard
          title="Gateway Health"
          description="Current operational status of gateway services"
          className="min-h-72"
        >
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Gateway health summary will be implemented next
          </div>
        </SectionCard>

        <SectionCard
          title="Error Distribution"
          description="Breakdown of gateway errors by category"
          className="min-h-72"
        >
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Error distribution chart will be implemented next
          </div>
        </SectionCard>
      </section>
    </div>
  );
}