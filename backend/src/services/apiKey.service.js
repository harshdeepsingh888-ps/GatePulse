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
      lastUsedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    apiKey: rawApiKey,
    details: apiKey,
  };
}

export async function listApiKeys(adminId) {
  return prisma.apiKey.findMany({
    where: {
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
      lastUsedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function revokeApiKey(adminId, apiKeyId) {
  const existingApiKey = await prisma.apiKey.findFirst({
    where: {
      id: apiKeyId,
      adminId,
    },
  });

  if (!existingApiKey) {
    const error = new Error("API key not found");
    error.statusCode = 404;
    throw error;
  }

  if (!existingApiKey.isActive) {
    const error = new Error("API key is already revoked");
    error.statusCode = 409;
    throw error;
  }

  return prisma.apiKey.update({
    where: {
      id: apiKeyId,
    },
    data: {
      isActive: false,
    },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      tier: true,
      requestsPerMinute: true,
      isActive: true,
      expiresAt: true,
      lastUsedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function regenerateApiKey(adminId, apiKeyId) {
  const existingApiKey = await prisma.apiKey.findFirst({
    where: {
      id: apiKeyId,
      adminId,
    },
  });

  if (!existingApiKey) {
    const error = new Error("API key not found");
    error.statusCode = 404;
    throw error;
  }

  const rawApiKey = generateRawApiKey();
  const keyHash = hashApiKey(rawApiKey);
  const keyPrefix = rawApiKey.slice(0, 16);

  const apiKey = await prisma.apiKey.update({
    where: {
      id: apiKeyId,
    },
    data: {
      keyHash,
      keyPrefix,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      tier: true,
      requestsPerMinute: true,
      isActive: true,
      expiresAt: true,
      lastUsedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    apiKey: rawApiKey,
    details: apiKey,
  };
}