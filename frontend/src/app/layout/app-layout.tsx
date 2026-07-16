import { Outlet } from "react-router";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar />

      <div className="ml-64 flex min-h-screen min-w-0 flex-col">
        <AppHeader />

        <main className="flex-1 bg-muted/20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}