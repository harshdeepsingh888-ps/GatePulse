import {
  Command,
  Search,

} from "lucide-react";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/command-palette";
import { ProfileDropdown } from "./profile-dropdown";
import { NotificationCenter } from "./notification-center";


import { Button } from "@/components/ui/button";

export function AppHeader() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] =
  useState(false);

  useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setIsCommandPaletteOpen(true);
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
    <header className="relative z-20 flex h-20 items-center justify-between border-b border-border/50 bg-background/75 px-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            GatePulse Control
          </span>

          <span className="size-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>

        <p className="mt-1 text-sm font-semibold tracking-tight">
          API Mission Control
        </p>

        <p className="text-xs text-muted-foreground">
          Observe traffic, latency, keys, and gateway health
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
  type="button"
  variant="outline"
  onClick={() => setIsCommandPaletteOpen(true)}
  className="hidden h-10 w-72 justify-start gap-2 rounded-xl border-border/60 bg-card/60 text-muted-foreground shadow-sm backdrop-blur md:flex"
>
          <Search className="size-4" />
          Search command center

          <kbd className="ml-auto flex items-center gap-1 rounded-md border border-border/70 bg-muted/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Command className="size-3" />
            K
          </kbd>
        </Button>

      <NotificationCenter />

        <ProfileDropdown />
            </div>

      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
      />
    </header>
  );
}