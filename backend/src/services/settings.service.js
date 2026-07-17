export function getSettings() {
  return {
    environment: process.env.NODE_ENV ?? "development",
    version: process.env.npm_package_version ?? "1.0.0",
    defaultApiTier: "FREE",
    rateLimitingEnabled: true,
    requestLoggingEnabled: true,
    authentication: {
      type: "JWT",
      sessionStatus: "active",
    },
  };
}