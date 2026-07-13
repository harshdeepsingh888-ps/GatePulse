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

const trafficData = [
  { time: "00:00", requests: 3200 },
  { time: "04:00", requests: 1800 },
  { time: "08:00", requests: 6200 },
  { time: "12:00", requests: 9800 },
  { time: "16:00", requests: 7600 },
  { time: "20:00", requests: 11200 },
  { time: "24:00", requests: 9100 },
];

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  }

  return value.toString();
}

function TrafficTooltip({
  active,
  payload,
  label,
}: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const requests = Number(payload[0]?.value ?? 0);

  return (
    <div className="rounded-xl border border-border bg-popover px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-blue-500" />

        <span className="text-sm text-muted-foreground">
          Requests
        </span>

        <span className="ml-3 text-sm font-semibold text-popover-foreground">
          {requests.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export function TrafficChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={trafficData}
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
              <stop
                offset="0%"
                stopColor="#3b82f6"
                stopOpacity={0.42}
              />

              <stop
                offset="55%"
                stopColor="#3b82f6"
                stopOpacity={0.14}
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
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
            dataKey="requests"
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}