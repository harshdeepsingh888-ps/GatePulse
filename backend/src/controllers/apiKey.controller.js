import {
  createApiKey,
  listApiKeys,
  regenerateApiKey,
  revokeApiKey,
} from "../services/apiKey.service.js";

import { successResponse } from "../shared/utils/apiResponse.js";

export async function create(req, res, next) {
  try {
    const result = await createApiKey(
      req.admin.id,
      req.body
    );

    return successResponse(
      res,
      "API key created successfully",
      result,
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function list(req, res, next) {
  try {
    const apiKeys = await listApiKeys(req.admin.id);

    return successResponse(
      res,
      "API keys retrieved successfully",
      {
        apiKeys,
        total: apiKeys.length,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function revoke(req, res, next) {
  try {
    const apiKey = await revokeApiKey(
      req.admin.id,
      req.params.id
    );

    return successResponse(
      res,
      "API key revoked successfully",
      {
        apiKey,
      }
    );
  } catch (error) {
    next(error);
  }
}
export async function regenerate(req, res, next) {
  try {
    const result = await regenerateApiKey(
      req.admin.id,
      req.params.id
    );

    return successResponse(
      res,
      "API key regenerated successfully",
      result
    );
  } catch (error) {
    next(error);
  }
}