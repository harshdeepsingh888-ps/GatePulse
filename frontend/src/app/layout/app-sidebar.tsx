import { Activity, Zap } from "lucide-react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

import { navigationItems } from "./navigation";

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-border/60 px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-foreground text-background shadow-sm">
            <Zap className="size-4.5" strokeWidth={2.2} />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight">
              GatePulse
            </p>

            <p className="text-xs text-muted-foreground">
              API Gateway Platform
            </p>
          </div>
        </div>
      </div>

      <nav
        className="flex-1 space-y-1 px-3 py-5"
        aria-label="Main navigation"
      >
        <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Workspace
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "size-4.5 shrink-0 transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                    strokeWidth={1.8}
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <span
                      className="ml-auto size-1.5 rounded-full bg-foreground"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3">
        <div className="rounded-xl border border-border/70 bg-card/50 p-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>

            <p className="text-xs font-medium">All systems operational</p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5" />
              Gateway status
            </span>

            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
