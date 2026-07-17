import { Save } from "lucide-react";

import { SectionCard } from "@/components/dashboard/section-card";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  return (
    <main className="space-y-8 p-6 lg:p-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Settings
          </span>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Gateway Administration
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage administrator details, gateway configuration,
            security preferences, and system information.
          </p>
        </div>

        <Button>
          <Save className="size-4" />
          Save Changes
        </Button>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-2">
        <SectionCard
  title="Administrator Profile"
  description="Account details for the current GatePulse administrator."
>
  <div className="space-y-6">
  <div className="flex items-center gap-4">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
      HS
    </div>

    <div>
      <h3 className="text-lg font-semibold">
        Harshdeep Singh
      </h3>

      <p className="text-sm text-muted-foreground">
        Primary Administrator
      </p>
    </div>
  </div>

  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Email
      </span>

      <span className="text-sm font-medium">
        harshdeepsingh87179@gmail.com
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Role
      </span>

      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        Administrator
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Status
      </span>

      <span className="flex items-center gap-2 text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Active
      </span>
    </div>
  </div>
</div>
        </SectionCard>

        <SectionCard
  title="Gateway Configuration"
  description="Core environment and gateway behavior settings."
>
  <div className="space-y-4">
    <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
      <div>
        <p className="text-sm font-medium">Environment</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Active gateway deployment environment
        </p>
      </div>

      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
        Production
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
      <div>
        <p className="text-sm font-medium">Default API Tier</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Applied when a new API key is created
        </p>
      </div>

      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
        FREE
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
      <div>
        <p className="text-sm font-medium">Rate Limiting</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Token-bucket protection for gateway traffic
        </p>
      </div>

      <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
        <span className="size-2 rounded-full bg-emerald-500" />
        Enabled
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
      <div>
        <p className="text-sm font-medium">Request Logging</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Store request metadata for analytics
        </p>
      </div>

      <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
        <span className="size-2 rounded-full bg-emerald-500" />
        Enabled
      </span>
    </div>
  </div>
</SectionCard>

        <SectionCard
          title="Security"
          description="Session, authentication, and API key security controls."
        >
          <div className="min-h-48" />
        </SectionCard>

        <SectionCard
          title="System Information"
          description="Current version, environment, and service status."
        >
          <div className="min-h-48" />
        </SectionCard>
      </section>
    </main>
  );
}