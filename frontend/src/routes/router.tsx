import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AnalyticsPage } from "../pages/analytics-page";
import { ApiKeysPage } from "../pages/api-keys-page";
import { DashboardPage } from "../pages/dashboard-page";
import { LoginPage } from "../pages/login-page";
import { SettingsPage } from "../pages/settings-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/api-keys" element={<ApiKeysPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
