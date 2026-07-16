import { Activity, ArrowRight, KeyRound, Radio } from "lucide-react";
import type { TooltipContentProps } from "recharts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { UsageTrendPoint } from "@/services/analytics.service";

type TrafficChartProps = {
  data: UsageTrendPoint[];
  totalRequests?: number;
};

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  }

  return value.toString();
}

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

function TrafficTooltip({
  active,
  payload,
  label,
}: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const totalRequests = Number(payload[0]?.value ?? 0);
  const blockedRequests = Number(payload[1]?.value ?? 0);

  return (
    <div className="min-w-44 rounded-xl border border-border/70 bg-popover/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span className="size-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.7)]" />
        <span className="text-sm text-muted-foreground">Requests</span>
        <span className="ml-auto text-sm font-semibold">
          {totalRequests.toLocaleString()}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        <span className="text-sm text-muted-foreground">Blocked</span>
        <span className="ml-auto text-sm font-semibold">
          {blockedRequests.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function EmptyTrafficState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/15 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
        <Activity className="size-5 text-primary" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        No gateway traffic recorded
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Create an API key and send a request through the gateway.
        Live traffic will appear here automatically.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5">
          <KeyRound className="size-3.5 text-primary" />
          Create API key
        </span>

        <ArrowRight className="size-3.5 text-muted-foreground" />

        <span className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5">
          <Radio className="size-3.5 text-cyan-500" />
          Send request
        </span>

        <ArrowRight className="size-3.5 text-muted-foreground" />

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-600">
          Watch analytics
        </span>
      </div>
    </div>
  );
}

export function TrafficChart({
  data,
  totalRequests = 0,
}: TrafficChartProps) {
  if (totalRequests === 0) {
    return <EmptyTrafficState />;
  }

  const chartData = data.map((point) => ({
    ...point,
    time: formatTime(point.timestamp),
  }));

  const lastUpdated = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.7)]" />
            Gateway requests
          </span>

          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            Blocked requests
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-30" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Updated {lastUpdated}
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 12,
              right: 8,
              left: -12,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="trafficGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
                <stop offset="55%" stopColor="#8b5cf6" stopOpacity={0.14} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="blockedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 6"
              stroke="currentColor"
              className="text-border/60"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              minTickGap={24}
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
              className="text-muted-foreground"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              width={48}
              tickFormatter={formatCompactNumber}
              allowDecimals={false}
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
              className="text-muted-foreground"
            />

            <Tooltip
              cursor={{
                stroke: "#8b5cf6",
                strokeDasharray: "4 4",
                strokeOpacity: 0.45,
              }}
              content={TrafficTooltip}
            />

            <Area
              type="monotone"
              dataKey="totalRequests"
              name="Requests"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#trafficGradient)"
              animationDuration={900}
              activeDot={{
                r: 5,
                strokeWidth: 3,
                stroke: "var(--background)",
                fill: "#8b5cf6",
              }}
            />

            <Area
              type="monotone"
              dataKey="blockedRequests"
              name="Blocked"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#blockedGradient)"
              animationDuration={900}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                stroke: "var(--background)",
                fill: "#f43f5e",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}