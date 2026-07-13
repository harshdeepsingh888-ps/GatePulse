import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricTone = "neutral" | "success" | "warning" | "danger";

type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  description: string;
  trend: "up" | "down";
  icon: LucideIcon;
  tone?: MetricTone;
};

const toneStyles: Record<
  MetricTone,
  {
    border: string;
    icon: string;
    accent: string;
  }
> = {
  neutral: {
    border: "border-border",
    icon: "bg-muted text-foreground",
    accent: "text-foreground",
  },
  success: {
    border: "border-emerald-500/20",
    icon: "bg-emerald-500/10 text-emerald-500",
    accent: "text-emerald-500",
  },
  warning: {
    border: "border-amber-500/20",
    icon: "bg-amber-500/10 text-amber-500",
    accent: "text-amber-500",
  },
  danger: {
    border: "border-rose-500/20",
    icon: "bg-rose-500/10 text-rose-500",
    accent: "text-rose-500",
  },
};

export function MetricCard({
  label,
  value,
  change,
  description,
  trend,
  icon: Icon,
  tone = "neutral",
}: MetricCardProps) {
  const styles = toneStyles[tone];
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5",
        styles.border,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px opacity-70",
          tone === "success" && "bg-emerald-500",
          tone === "warning" && "bg-amber-500",
          tone === "danger" && "bg-rose-500",
          tone === "neutral" && "bg-foreground/20",
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl border border-current/10",
            styles.icon,
          )}
        >
          <Icon className="size-5" strokeWidth={1.9} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-xs">
        <TrendIcon className={cn("size-3.5", styles.accent)} />

        <span className={cn("font-semibold", styles.accent)}>
          {change}
        </span>

        <span className="text-muted-foreground">
          {description}
        </span>
      </div>
    </article>
  );
}
