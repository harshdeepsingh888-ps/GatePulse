import { Navigate } from "react-router";

import { getAccessToken } from "@/services/auth.service";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({
  children,
}: PublicRouteProps) {
  const token = getAccessToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}