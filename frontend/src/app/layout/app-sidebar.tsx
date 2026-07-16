import { Activity, Radio, Zap } from "lucide-react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

import { navigationItems } from "./navigation";

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-64 flex-col overflow-hidden border-r border-white/8 bg-[oklch(0.12_0.03_285)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 -top-24 size-64 rounded-full bg-primary/25 blur-[90px]" />
        <div className="absolute bottom-10 right-0 size-48 rounded-full bg-cyan-500/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white/3%,transparent_18%,transparent_80%,white/2%)]" />
      </div>

      <div className="relative z-10 flex h-20 items-center border-b border-white/8 px-5">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 shadow-[0_0_30px_oklch(0.68_0.22_286/0.2)]">
            <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-primary/30 to-cyan-400/10" />
            <Zap className="relative size-4.5 text-white" strokeWidth={2.3} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight">
                GatePulse
              </p>

              <span className="rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/90">
                Live
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-white/45">
              API Mission Control
            </p>
          </div>
        </div>
      </div>

      <nav
        className="relative z-10 flex-1 space-y-1 px-3 py-6"
        aria-label="Main navigation"
      >
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
          Command Center
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/55 hover:bg-white/6 hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary to-cyan-400 shadow-[0_0_12px_oklch(0.7_0.2_286/0.9)]"
                    />
                  )}

                  <Icon
                    className={cn(
                      "relative size-4.5 shrink-0 transition-all duration-200",
                      isActive
                        ? "text-primary-foreground drop-shadow-[0_0_8px_oklch(0.7_0.2_286/0.45)]"
                        : "text-white/40 group-hover:text-white/80",
                    )}
                    strokeWidth={1.8}
                  />

                  <span className="relative">{item.label}</span>

                  {isActive && (
                    <span className="relative ml-auto flex size-5 items-center justify-center rounded-full bg-primary/15">
                      <span className="size-1.5 rounded-full bg-primary-foreground" />
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="relative z-10 p-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" />
              </span>

              <p className="text-xs font-medium text-white">
                Gateway operational
              </p>
            </div>

            <Radio className="size-3.5 text-emerald-400" />
          </div>

          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5" />
              Production
            </span>

            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}