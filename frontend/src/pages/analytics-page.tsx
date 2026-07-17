import {
  Activity,
  CheckCircle2,
  Clock3,
  ShieldAlert,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { ErrorDistribution } from "@/components/dashboard/error-distribution";
import { GatewayHealth } from "@/components/dashboard/gateway-health";
import { SectionCard } from "@/components/dashboard/section-card";
import { useDashboardAnalytics } from "@/features/analytics/hooks/use-dashboard-analytics";
import { TopApiKeysTable } from "@/components/analytics/top-api-keys-table";

export function AnalyticsPage() {
  const analytics = useDashboardAnalytics();

const overview = analytics.overviewQuery.data;
const latency = analytics.latencyQuery.data;
const errors = analytics.errorsQuery.data;
const successRate =
  overview && errors
    ? (
        ((overview.totalRequests - errors.totalErrors) /
          Math.max(overview.totalRequests, 1)) *
        100
      ).toFixed(2)
    : "--";
  return (
    <main className="space-y-8 p-6 lg:p-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Analytics
          </span>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Gateway Insights
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Understand request volume, latency, failures, and
            overall gateway performance from a single workspace.
          </p>
        </div>

        <Button variant="outline">
          Last 24 Hours
        </Button>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
  label="Requests"
  value={
    overview
      ? overview.totalRequests.toLocaleString()
      : "--"
  }
  change="Live"
  description="gateway requests"
  trend="up"
  icon={Activity}
  tone="success"
/>

        <MetricCard
  label="Errors"
  value={
    errors
      ? errors.totalErrors.toLocaleString()
      : "--"
  }
  change="Live"
  description="gateway errors"
  trend="down"
  icon={ShieldAlert}
  tone="warning"
/>
        <MetricCard
          label="Avg Latency"
          value={
  latency
    ? `${latency.averageLatencyMs.toLocaleString()} ms`
    : "--"
}
change="Live"
description="average latency"
          trend="down"
          icon={Clock3}
          tone="success"
        />

        <MetricCard
          label="Success Rate"
          value={`${successRate}%`}
          change="+0.3%"
          description="vs yesterday"
          trend="up"
          icon={CheckCircle2}
          tone="success"
        />
      </section>
        <section>
        <div className="space-y-3">
          <ChartCard
            title="Traffic Overview"
            description="Real-time gateway request volume over the selected time period."
          >
            <TrafficChart
  data={analytics.usageTrendQuery.data ?? []}
  totalRequests={overview?.totalRequests ?? 0}
/>
          </ChartCard>

          <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <SectionCard
              title="Gateway Health"
              description="Current service health, API key activity, request blocking, and latency."
            >
              <GatewayHealth
  overview={overview}
  latency={latency}
/>
            </SectionCard>

            <SectionCard
              title="Error Distribution"
              description="Breakdown of gateway failures by HTTP status code."
            >
              <ErrorDistribution errors={errors} />
            </SectionCard>
          </section>
          <SectionCard
  title="Top API Keys"
  description="API credentials generating the highest gateway traffic."
>
  <TopApiKeysTable
    apiKeys={analytics.topApiKeysQuery.data ?? []}
  />
</SectionCard>
        </div>
      </section>
    </main>
  );
}