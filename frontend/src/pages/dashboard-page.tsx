import {
  Activity,
  Clock3,
  KeyRound,
  ShieldAlert,
} from "lucide-react";

import { ChartCard } from "@/components/dashboard/chart-card";
import { ErrorDistribution } from "@/components/dashboard/error-distribution";
import { GatewayHealth } from "@/components/dashboard/gateway-health";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentRequestsTable } from "@/components/dashboard/recent-requests-table";
import { SectionCard } from "@/components/dashboard/section-card";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { useDashboardAnalytics } from "@/features/analytics/hooks/use-dashboard-analytics";
import { GatewayPulseHero } from "@/components/dashboard/gateway-pulse-hero";

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
    label: "Blocked Requests",
    value: overview
      ? overview.blockedRequests.toLocaleString()
      : "--",
    change: "Security",
    trend: "up",
    description: "requests blocked by gateway",
    icon: ShieldAlert,
    tone: "danger",
  },
  {
    label: "Success Rate",
    value: overview
      ? `${(100 - errorRate).toFixed(2)}%`
      : "--",
    change: "Healthy",
    trend: "up",
    description: "successful gateway responses",
    icon: Activity,
    tone: "success",
  },
  {
    label: "Peak Latency",
    value: latency
      ? `${latency.maximumLatencyMs.toLocaleString()} ms`
      : "--",
    change: "Today",
    trend: "down",
    description: "highest response time",
    icon: Clock3,
    tone: "warning",
  },
  {
    label: "Fastest Response",
    value: latency
      ? `${latency.minimumLatencyMs.toLocaleString()} ms`
      : "--",
    change: "Today",
    trend: "up",
    description: "lowest response time",
    icon: KeyRound,
    tone: "neutral",
  },
] as const;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      <GatewayPulseHero
  overview={overview}
  latency={latency}
  errorRate={errorRate}
/>

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
  title="Traffic Intelligence"
  description="Live gateway traffic and request protection over the last 24 hours"
>
  <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Requests
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">
        {overview?.totalRequests.toLocaleString() ?? "--"}
      </p>
    </div>

    <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Blocked
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-rose-500">
        {overview?.blockedRequests.toLocaleString() ?? "--"}
      </p>
    </div>

    <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Success Rate
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-500">
        {overview ? `${(100 - errorRate).toFixed(2)}%` : "--"}
      </p>
    </div>

    <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Avg. Latency
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-cyan-500">
        {latency
          ? `${latency.averageLatencyMs.toLocaleString()} ms`
          : "--"}
      </p>
    </div>
  </div>

  <TrafficChart
  data={analytics.usageTrendQuery.data ?? []}
  totalRequests={overview?.totalRequests}
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
                {analytics.topApiKeysQuery.data
                  .slice(0, 5)
                  .map((apiKey, index) => (
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
                            {apiKey.isActive
                              ? "Active"
                              : "Revoked"}
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
              requests={analytics.recentRequestsQuery.data.slice(
                0,
                8,
              )}
            />
          )}
        </SectionCard>

        <SectionCard
          title="Gateway Health"
          description="Current operational status of gateway services"
          className="min-h-72"
        >
          {analytics.overviewQuery.isPending ||
          analytics.latencyQuery.isPending ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
              Loading gateway health...
            </div>
          ) : analytics.overviewQuery.isError ||
            analytics.latencyQuery.isError ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-destructive">
              Unable to load gateway health.
            </div>
          ) : (
            <GatewayHealth
              overview={analytics.overviewQuery.data}
              latency={analytics.latencyQuery.data}
            />
          )}
        </SectionCard>

        <SectionCard
          title="Error Distribution"
          description="Breakdown of gateway errors by category"
          className="min-h-72"
        >
          {analytics.errorsQuery.isPending ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
              Loading error distribution...
            </div>
          ) : analytics.errorsQuery.isError ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-destructive">
              Unable to load error distribution.
            </div>
          ) : (
            <ErrorDistribution
              errors={analytics.errorsQuery.data}
            />
          )}
        </SectionCard>
      </section>
    </div>
  );
}