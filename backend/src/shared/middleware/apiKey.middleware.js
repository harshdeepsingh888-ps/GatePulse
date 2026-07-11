import { createHash } from "node:crypto";

import { prisma } from "../../lib/prisma.js";

function hashApiKey(rawApiKey) {
  return createHash("sha256")
    .update(rawApiKey)
    .digest("hex");
}

export async function authenticateApiKey(
  req,
  res,
  next
) {
  try {
    const rawApiKey = req.header("x-api-key");

    if (!rawApiKey) {
      const error = new Error("API key is required");
      error.statusCode = 401;
      throw error;
    }

    const keyHash = hashApiKey(rawApiKey);

    const apiKey = await prisma.apiKey.findUnique({
      where: {
        keyHash,
      },
      select: {
        id: true,
        adminId: true,
        name: true,
        tier: true,
        requestsPerMinute: true,
        isActive: true,
        expiresAt: true,
      },
    });

    if (!apiKey) {
      const error = new Error("Invalid API key");
      error.statusCode = 401;
      throw error;
    }

    if (!apiKey.isActive) {
      const error = new Error("API key has been revoked");
      error.statusCode = 403;
      throw error;
    }

    if (
      apiKey.expiresAt &&
      apiKey.expiresAt < new Date()
    ) {
      const error = new Error("API key has expired");
      error.statusCode = 403;
      throw error;
    }

    req.apiKey = apiKey;

    next();
  } catch (error) {
    next(error);
  }
}