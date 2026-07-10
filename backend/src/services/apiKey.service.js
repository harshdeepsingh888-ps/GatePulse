import {
  createHash,
  randomBytes,
} from "node:crypto";

import { prisma } from "../lib/prisma.js";

function generateRawApiKey() {
  const randomSecret = randomBytes(32).toString("base64url");

  return `gp_live_${randomSecret}`;
}

function hashApiKey(rawApiKey) {
  return createHash("sha256")
    .update(rawApiKey)
    .digest("hex");
}

export async function createApiKey(adminId, input) {
  const rawApiKey = generateRawApiKey();
  const keyHash = hashApiKey(rawApiKey);
  const keyPrefix = rawApiKey.slice(0, 16);

  const apiKey = await prisma.apiKey.create({
    data: {
      name: input.name,
      tier: input.tier,
      requestsPerMinute: input.requestsPerMinute,
      expiresAt: input.expiresAt
        ? new Date(input.expiresAt)
        : null,
      keyHash,
      keyPrefix,
      adminId,
    },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      tier: true,
      requestsPerMinute: true,
      isActive: true,
      expiresAt: true,
      createdAt: true,
    },
  });

  return {
    apiKey: rawApiKey,
    details: apiKey,
  };
}