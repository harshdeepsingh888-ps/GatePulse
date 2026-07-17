import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";

import healthRoutes from "./routes/health.routes.js";
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import apiKeyRoutes from "./routes/apiKey.routes.js";
import gatewayRoutes from "./routes/gateway.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

import { logger } from "./shared/logger/logger.js";

import {
  globalErrorHandler,
  notFoundHandler,
} from "./shared/middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  pinoHttp({
    logger,
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "res.headers['set-cookie']",
      ],
      censor: "[REDACTED]",
    },
  })
);

app.use("/api", healthRoutes);
app.use("/api", testRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/api-keys", apiKeyRoutes);

app.use("/gateway", gatewayRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;