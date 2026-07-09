import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";

import healthRoutes from "./routes/health.routes.js";
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
  })
);

app.use("/api", healthRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;