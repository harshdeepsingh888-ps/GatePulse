import { useState } from "react";
import { Check, Copy, Loader2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRegenerateApiKey } from "@/features/api-keys/hooks/use-regenerate-api-key";

type RegenerateApiKeyDialogProps = {
  apiKeyId: string | null;
  apiKeyName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RegenerateApiKeyDialog({
  apiKeyId,
  apiKeyName,
  open,
  onOpenChange,
}: RegenerateApiKeyDialogProps) {
  const regenerateMutation = useRegenerateApiKey();

  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleDialogChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setGeneratedKey(null);
      setCopied(false);
      regenerateMutation.reset();
    }
  }

  async function handleRegenerate() {
    if (!apiKeyId) {
      return;
    }

    const response = await regenerateMutation.mutateAsync(apiKeyId);

    setGeneratedKey(response.apiKey);
  }

  async function handleCopy() {
    if (!generatedKey) {
      return;
    }

    await navigator.clipboard.writeText(generatedKey);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-lg">
        {generatedKey ? (
          <>
            <DialogHeader>
              <DialogTitle>API key regenerated</DialogTitle>

              <DialogDescription>
                Copy this new secret now. The previous key is no longer valid.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="break-all font-mono text-sm">
                {generatedKey}
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}

                {copied ? "Copied" : "Copy key"}
              </Button>

              <Button
                type="button"
                onClick={() => handleDialogChange(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Regenerate API key?</DialogTitle>

              <DialogDescription>
                This will immediately invalidate the current secret for{" "}
                <span className="font-medium text-foreground">
                  {apiKeyName ?? "this API key"}
                </span>
                .
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-700">
              Any client still using the old key will stop working immediately.
            </div>

            {regenerateMutation.isError && (
              <p className="text-sm text-destructive">
                Unable to regenerate the API key. Your session may have expired.
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleRegenerate}
                disabled={
                  !apiKeyId || regenerateMutation.isPending
                }
              >
                {regenerateMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RotateCcw className="size-4" />
                    Regenerate key
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}