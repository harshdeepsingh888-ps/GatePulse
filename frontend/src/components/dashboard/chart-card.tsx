import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChartCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ChartCard({
  title,
  description,
  action,
  footer,
  children,
  className,
}: ChartCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <header className="flex items-start justify-between border-b border-border px-6 py-5">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {action}
      </header>

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <footer className="border-t border-border bg-muted/30 px-6 py-4">
          {footer}
        </footer>
      )}
    </section>
  );
}