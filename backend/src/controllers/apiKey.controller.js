import { createApiKey } from "../services/apiKey.service.js";
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