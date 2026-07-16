import {
  Activity,
  Clock3,
  KeyRound,
  ShieldAlert,
} from "lucide-react";

import type {
  AnalyticsOverview,
  LatencyAnalytics,
} from "@/services/analytics.service";

type GatewayPulseHeroProps = {
  overview?: AnalyticsOverview;
  latency?: LatencyAnalytics;
  errorRate: number;
};

export function GatewayPulseHero({
  overview,
  latency,
  errorRate,
}: GatewayPulseHeroProps) {
  const stats = [
    {
      label: "Requests",
      value: overview?.totalRequests.toLocaleString() ?? "--",
      icon: Activity,
    },
    {
      label: "Latency",
      value: latency
        ? `${latency.averageLatencyMs} ms`
        : "--",
      icon: Clock3,
    },
    {
      label: "Errors",
      value: `${errorRate.toFixed(2)}%`,
      icon: ShieldAlert,
    },
    {
      label: "API Keys",
      value: overview?.activeApiKeys.toLocaleString() ?? "--",
      icon: KeyRound,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161b2d] via-[#111827] to-[#09090b] p-8 shadow-2xl">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                LIVE
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white">
              Gateway Operational
            </h1>

            <p className="mt-2 text-gray-400">
              Production environment • API Mission Control
            </p>
          </div>

          <div className="hidden w-64 flex-col gap-4 lg:flex">
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">Environment</span>

      <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">
        Production
      </span>
    </div>

    <div className="mt-4 space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Availability</span>
        <span className="font-semibold text-white">99.98%</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Gateway</span>
        <span className="text-emerald-400">● Healthy</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Last Refresh</span>
        <span className="text-white">Just now</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Throughput</span>
        <span className="text-cyan-300">
          {overview?.totalRequests ?? 0} req
        </span>
      </div>
    </div>
  </div>
</div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-violet-400" />

                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    Live
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold text-white">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}