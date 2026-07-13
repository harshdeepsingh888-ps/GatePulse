import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/60 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div>
        <p className="text-sm font-semibold tracking-tight">
          GatePulse Workspace
        </p>

        <p className="text-xs text-muted-foreground">
          Monitor traffic, keys, latency, and gateway health
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="hidden h-9 w-64 justify-start gap-2 text-muted-foreground md:flex"
        >
          <Search className="size-4" />
          Search workspace
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="View notifications"
        >
          <Bell className="size-4.5" />
        </Button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent"
          aria-label="Open profile menu"
        >
          <div className="flex size-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold">
            HS
          </div>

          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium">Harshdeep Singh</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </button>
      </div>
    </header>
  );
}
