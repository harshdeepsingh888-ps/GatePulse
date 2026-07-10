import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "API key name must contain at least 2 characters")
    .max(100, "API key name cannot exceed 100 characters"),

  tier: z
    .enum(["FREE", "PRO"])
    .default("FREE"),

  requestsPerMinute: z
    .number()
    .int("Requests per minute must be an integer")
    .min(1, "Requests per minute must be at least 1")
    .max(10000, "Requests per minute cannot exceed 10000"),

  expiresAt: z
    .string()
    .datetime("expiresAt must be a valid ISO datetime")
    .optional()
    .nullable(),
});