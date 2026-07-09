import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";

import healthRoutes from "./routes/health.routes.js";
import testRoutes from "./routes/test.routes.js";

import { logger } from "./shared/logger/logger.js";

import {
  notFoundHandler,
  globalErrorHandler,
} from "./shared/middleware/error.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(cors());

// Parse JSON Request Body
app.use(express.json());

// HTTP Request Logger
app.use(
  pinoHttp({
    logger,
  })
);

// Routes
app.use("/api", healthRoutes);
app.use("/api", testRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;