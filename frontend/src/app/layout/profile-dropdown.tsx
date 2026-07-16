import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth.service";

export function ProfileDropdown() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 text-left transition-all hover:border-border/60 hover:bg-card/60"
        aria-label="Open profile menu"
      >
        <div className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-cyan-500/10 text-xs font-semibold text-foreground shadow-sm">
          HS
        </div>

        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-medium">Harshdeep Singh</p>
          <p className="text-xs text-muted-foreground">
            Administrator
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-xl border border-border/70 p-2 shadow-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-semibold">
                HS
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Harshdeep Singh
                </p>
                <p className="text-xs text-muted-foreground">
                  Administrator
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="px-2 py-2"
          onClick={() => navigate("/settings")}
        >
          <Settings className="size-4" />
          Account settings
        </DropdownMenuItem>

        <DropdownMenuItem className="px-2 py-2" disabled>
          <User className="size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="px-2 py-2"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}