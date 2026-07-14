import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { ErrorAnalytics } from "@/services/analytics.service";

type ErrorDistributionProps = {
  errors?: ErrorAnalytics;
};

const chartColors = [
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#dc2626",
  "#be123c",
];

export function ErrorDistribution({
  errors,
}: ErrorDistributionProps) {
  const chartData =
    errors?.statusBreakdown.map((item) => ({
      name: String(item.statusCode),
      value: item.count,
    })) ?? [];

  if (chartData.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
        No gateway errors recorded.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Requests",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor:
                    chartColors[index % chartColors.length],
                }}
              />

              <span className="text-sm text-muted-foreground">
                HTTP {item.name}
              </span>
            </div>

            <span className="text-sm font-semibold">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}