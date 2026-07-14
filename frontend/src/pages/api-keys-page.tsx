import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";

import { ApiKeyActions } from "@/components/api-keys/api-key-actions";
import { CreateApiKeyDialog } from "@/components/api-keys/create-api-key-dialog";
import { RegenerateApiKeyDialog } from "@/components/api-keys/regenerate-api-key-dialog";
import { SectionCard } from "@/components/dashboard/section-card";
import { useApiKeys } from "@/features/api-keys/hooks/use-api-keys";
import { useRevokeApiKey } from "@/features/api-keys/hooks/use-revoke-api-key";

function formatDate(value: string | null) {
  if (!value) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ApiKeysPage() {
  const apiKeysQuery = useApiKeys();
  const revokeApiKeyMutation = useRevokeApiKey();

  const [regenerateTarget, setRegenerateTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  async function handleRevoke(id: string, name: string) {
    const confirmed = window.confirm(
      `Revoke "${name}"? This API key will stop working immediately.`,
    );

    if (!confirmed) {
      return;
    }

    await revokeApiKeyMutation.mutateAsync(id);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted">
            <KeyRound className="size-5" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              API Keys
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage credentials that access your GatePulse gateway.
            </p>
          </div>
        </div>

        <CreateApiKeyDialog />
      </section>

      <SectionCard
        title="Workspace API Keys"
        description="Keys are retrieved directly from your GatePulse backend."
      >
        {apiKeysQuery.isPending && (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            Loading API keys...
          </div>
        )}

        {apiKeysQuery.isError && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm font-medium text-destructive">
              Unable to load API keys.
            </p>

            <p className="max-w-md text-sm text-muted-foreground">
              Confirm that the backend is running and that your session is
              still valid.
            </p>

            <button
              type="button"
              onClick={() => apiKeysQuery.refetch()}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Try again
            </button>
          </div>
        )}

        {apiKeysQuery.isSuccess && apiKeysQuery.data.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted">
              <KeyRound className="size-5 text-muted-foreground" />
            </div>

            <p className="mt-4 text-sm font-medium">No API keys found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first key to start routing requests.
            </p>
          </div>
        )}

        {apiKeysQuery.isSuccess && apiKeysQuery.data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Prefix</th>
                  <th className="pb-3 font-medium">Tier</th>
                  <th className="pb-3 font-medium">Rate Limit</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Last Used</th>
                  <th className="pb-3 font-medium">Created</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {apiKeysQuery.data.map((apiKey) => {
                  const isRevoking =
                    revokeApiKeyMutation.isPending &&
                    revokeApiKeyMutation.variables === apiKey.id;

                  return (
                    <tr
                      key={apiKey.id}
                      className="border-b border-border/60 text-sm last:border-0"
                    >
                      <td className="py-4 font-medium">{apiKey.name}</td>

                      <td className="py-4 font-mono text-xs text-muted-foreground">
                        {apiKey.keyPrefix}...
                      </td>

                      <td className="py-4">
                        <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium">
                          {apiKey.tier}
                        </span>
                      </td>

                      <td className="py-4 text-muted-foreground">
                        {apiKey.requestsPerMinute} RPM
                      </td>

                      <td className="py-4">
                        <span
                          className={
                            apiKey.isActive
                              ? "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600"
                              : "rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-600"
                          }
                        >
                          {apiKey.isActive ? "Active" : "Revoked"}
                        </span>
                      </td>

                      <td className="py-4 text-muted-foreground">
                        {formatDate(apiKey.lastUsedAt)}
                      </td>

                      <td className="py-4 text-muted-foreground">
                        {formatDate(apiKey.createdAt)}
                      </td>

                      <td className="py-4 text-right">
                        <ApiKeyActions
                          isActive={apiKey.isActive}
                          isLoading={isRevoking}
                          onRevoke={() =>
                            handleRevoke(apiKey.id, apiKey.name)
                          }
                          onRegenerate={() =>
                            setRegenerateTarget({
                              id: apiKey.id,
                              name: apiKey.name,
                            })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {revokeApiKeyMutation.isError && (
              <p className="mt-4 text-sm text-destructive">
                Unable to revoke the API key. Your session may have expired.
              </p>
            )}
          </div>
        )}
      </SectionCard>

      <RegenerateApiKeyDialog
        apiKeyId={regenerateTarget?.id ?? null}
        apiKeyName={regenerateTarget?.name ?? null}
        open={regenerateTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRegenerateTarget(null);
          }
        }}
      />
    </div>
  );
}