import { useState } from "react";
import { Check, Copy, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateApiKey } from "@/features/api-keys/hooks/use-create-api-key";

export function CreateApiKeyDialog() {
  const createApiKeyMutation = useCreateApiKey();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("FREE");
  const [requestsPerMinute, setRequestsPerMinute] = useState("60");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function resetForm() {
    setName("");
    setTier("FREE");
    setRequestsPerMinute("60");
    setCreatedKey(null);
    setCopied(false);
    createApiKeyMutation.reset();
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await createApiKeyMutation.mutateAsync({
      name: name.trim(),
      tier,
      requestsPerMinute: Number(requestsPerMinute),
      expiresAt: null,
    });

    setCreatedKey(response.apiKey);
  }

  async function handleCopy() {
    if (!createdKey) {
      return;
    }

    await navigator.clipboard.writeText(createdKey);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button">
            <Plus className="size-4" />
            Create API Key
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        {createdKey ? (
          <>
            <DialogHeader>
              <DialogTitle>API key created</DialogTitle>

              <DialogDescription>
                Copy this secret now. GatePulse will not display it again.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="break-all font-mono text-sm">
                {createdKey}
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
                onClick={() => handleOpenChange(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>

              <DialogDescription>
                Create a credential for a client that will access your gateway.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-6">
              <div className="grid gap-2">
                <Label htmlFor="api-key-name">Name</Label>

                <Input
                  id="api-key-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Production client"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </div>

              <div className="grid gap-2">
                <Label>Tier</Label>

                <Select
                  value={tier}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setTier(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="FREE">FREE</SelectItem>
                    <SelectItem value="PRO">PRO</SelectItem>
                    <SelectItem value="ENTERPRISE">
                      ENTERPRISE
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="requests-per-minute">
                  Requests per minute
                </Label>

                <Input
                  id="requests-per-minute"
                  type="number"
                  min={1}
                  max={100000}
                  value={requestsPerMinute}
                  onChange={(event) =>
                    setRequestsPerMinute(event.target.value)
                  }
                  required
                />
              </div>

              {createApiKeyMutation.isError && (
                <p className="text-sm text-destructive">
                  Unable to create the API key. Check the values and try again.
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  createApiKeyMutation.isPending ||
                  !name.trim() ||
                  Number(requestsPerMinute) < 1
                }
              >
                {createApiKeyMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create key"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}