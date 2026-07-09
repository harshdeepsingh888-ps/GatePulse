import { logger } from "../logger/logger.js";
import { errorResponse } from "../utils/apiResponse.js";

export function notFoundHandler(req, res, next) {
  return errorResponse(res, "Route not found", 404);
}

export function globalErrorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  return errorResponse(
    res,
    err.message || "Internal server error",
    err.statusCode || 500
  );
}