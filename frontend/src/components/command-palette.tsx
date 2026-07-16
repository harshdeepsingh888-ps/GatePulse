import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { navigationItems } from "@/app/layout/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({
  open,
  onOpenChange,
}: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return navigationItems;
    }

    return navigationItems.filter((item) =>
      item.label.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  function handleNavigate(href: string) {
    navigate(href);
    setQuery("");
    onOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setQuery("");
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-4 text-muted-foreground" />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search GatePulse..."
            className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />

          <kbd className="rounded-md border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No matching commands.
            </div>
          ) : (
            items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4" />
                  </div>

                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Open {item.label.toLowerCase()}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}