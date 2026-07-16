import { Bell, CheckCircle2, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative size-10 rounded-xl border-border/60 bg-card/60 backdrop-blur"
            aria-label="Open notifications"
          />
        }
      >
        <Bell className="size-4.5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-80 rounded-xl border border-border/70 p-2 shadow-xl"
      >
        <DropdownMenuGroup>
  <DropdownMenuLabel className="px-2 py-2">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Notifications
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Gateway activity and system alerts
        </p>
      </div>

      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600">
        <CheckCircle2 className="size-3" />
        All clear
      </span>
    </div>
  </DropdownMenuLabel>
</DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="flex flex-col items-center px-5 py-8 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
            <Inbox className="size-5 text-primary" />
          </div>

          <p className="mt-4 text-sm font-medium">
            No unread notifications
          </p>

          <p className="mt-1 max-w-56 text-xs leading-5 text-muted-foreground">
            Gateway incidents, security warnings, and rate-limit alerts
            will appear here.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}