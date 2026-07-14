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
    <div className="rounded-xl border border-border bg-popover px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground">
  {label}
</p>

      <div className="mt-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-blue-500" />
        <span className="text-sm text-muted-foreground">Requests</span>
        <span className="ml-auto text-sm font-semibold text-popover-foreground">
          {totalRequests.toLocaleString()}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-rose-500" />
        <span className="text-sm text-muted-foreground">Blocked</span>
        <span className="ml-auto text-sm font-semibold text-popover-foreground">
          {blockedRequests.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export function TrafficChart({ data }: TrafficChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    time: formatTime(point.timestamp),
  }));

  return (
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
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.42} />
              <stop offset="55%" stopColor="#3b82f6" stopOpacity={0.14} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>

            <linearGradient
              id="blockedGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            minTickGap={24}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            width={48}
            tickFormatter={formatCompactNumber}
            allowDecimals={false}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "hsl(var(--border))",
              strokeDasharray: "4 4",
            }}
            content={TrafficTooltip}
          />

          <Area
            type="monotone"
            dataKey="totalRequests"
            name="Requests"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#trafficGradient)"
            animationDuration={900}
            activeDot={{
              r: 5,
              strokeWidth: 3,
              stroke: "hsl(var(--background))",
              fill: "#3b82f6",
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
              stroke: "hsl(var(--background))",
              fill: "#f43f5e",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}