import { logger } from "../logger/logger.js";

export function notFoundHandler(req, res, next) {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
}

export function globalErrorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
}