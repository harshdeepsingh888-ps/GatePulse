import { prisma } from "../../lib/prisma.js";

export function logGatewayRequest(req, res, next) {
  const startedAt = process.hrtime.bigint();

  res.on("finish", async () => {
    try {
      const finishedAt = process.hrtime.bigint();

      const responseTimeMs = Number(
        finishedAt - startedAt
      ) / 1_000_000;

      await prisma.requestLog.create({
        data: {
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: res.statusCode,
          responseTimeMs: Math.round(responseTimeMs),
          ipAddress: req.ip ?? null,
          userAgent: req.get("user-agent") ?? null,
          wasBlocked: res.statusCode === 429,
          blockReason:
            res.statusCode === 429
              ? "RATE_LIMIT_EXCEEDED"
              : null,
          apiKeyId: req.apiKey?.id ?? null,
        },
      });
    } catch (error) {
      req.log?.error(
        {
          err: error,
          method: req.method,
          endpoint: req.originalUrl,
        },
        "Failed to persist gateway request log"
      );
    }
  });

  return next();
}