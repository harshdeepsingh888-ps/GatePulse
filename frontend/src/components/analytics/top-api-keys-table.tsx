import { KeyRound } from "lucide-react";

import type { TopApiKey } from "@/services/analytics.service";

type TopApiKeysTableProps = {
  apiKeys?: TopApiKey[];
};

function getTierClasses(tier: string) {
  switch (tier.toUpperCase()) {
    case "PRO":
      return "border-violet-500/20 bg-violet-500/10 text-violet-600";
    case "ENTERPRISE":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-600";
    default:
      return "border-border/70 bg-muted text-muted-foreground";
  }
}

export function TopApiKeysTable({
  apiKeys = [],
}: TopApiKeysTableProps) {
  if (apiKeys.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/15 px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <KeyRound className="size-5 text-primary" />
        </div>

        <h3 className="mt-4 text-base font-semibold">
          No API key activity yet
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          API keys will appear here once they begin sending requests
          through the gateway.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70">
      <div className="hidden grid-cols-[minmax(0,1.7fr)_0.7fr_0.8fr_0.8fr] gap-4 border-b border-border/70 bg-muted/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:grid">
        <span>API Key</span>
        <span>Tier</span>
        <span>Status</span>
        <span className="text-right">Requests</span>
      </div>

      <div className="divide-y divide-border/70">
        {apiKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/25 md:grid-cols-[minmax(0,1.7fr)_0.7fr_0.8fr_0.8fr] md:items-center"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                <KeyRound className="size-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {apiKey.name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Gateway credential
                </p>
              </div>
            </div>

            <div>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getTierClasses(
                  apiKey.tier,
                )}`}
              >
                {apiKey.tier}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={
                  apiKey.isActive
                    ? "size-2 rounded-full bg-emerald-500"
                    : "size-2 rounded-full bg-muted-foreground"
                }
              />

              <span
                className={
                  apiKey.isActive
                    ? "text-sm font-medium text-emerald-600"
                    : "text-sm font-medium text-muted-foreground"
                }
              >
                {apiKey.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm font-semibold">
                {apiKey.totalRequests.toLocaleString()}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                requests
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}