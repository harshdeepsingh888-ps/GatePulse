import { MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ApiKeyActionsProps = {
  isActive: boolean;
  isLoading: boolean;
  onRegenerate: () => void;
  onRevoke: () => void;
};

export function ApiKeyActions({
  isActive,
  isLoading,
  onRegenerate,
  onRevoke,
}: ApiKeyActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open API key actions"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onRegenerate}>
          <RotateCcw className="mr-2 size-4" />
          Regenerate
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!isActive || isLoading}
          onClick={onRevoke}
          className="text-red-600"
        >
          <Trash2 className="mr-2 size-4" />
          Revoke
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}