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

const metrics = [
  {
    label: "Total Requests",
    value: "1,248,593",
    change: "18.6%",
    trend: "up",
    description: "vs yesterday",
    icon: Activity,
    tone: "neutral",
  },
  {
    label: "Avg. Latency",
    value: "142 ms",
    change: "6.3%",
    trend: "down",
    description: "vs yesterday",
    icon: Clock3,
    tone: "warning",
  },
  {
    label: "Error Rate",
    value: "0.42%",
    change: "12.1%",
    trend: "down",
    description: "vs yesterday",
    icon: ShieldAlert,
    tone: "danger",
  },
  {
    label: "Active API Keys",
    value: "128",
    change: "8.7%",
    trend: "up",
    description: "vs yesterday",
    icon: KeyRound,
    tone: "success",
  },
] as const;

export function DashboardPage() {
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
          <TrafficChart />
        </ChartCard>

        <SectionCard
          title="Top API Keys"
          description="Highest traffic consumers during the selected period"
          className="min-h-96"
        >
          <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            API key usage ranking will be implemented next
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title="Recent Requests"
          description="Latest requests processed by the gateway"
          className="min-h-72"
        >
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Recent requests table will be implemented next
          </div>
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