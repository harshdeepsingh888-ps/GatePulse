import { getSettings } from "../services/settings.service.js";
import { successResponse } from "../shared/utils/apiResponse.js";

export async function settingsOverview(req, res, next) {
  try {
    const settings = getSettings();

    return successResponse(
      res,
      "Settings retrieved successfully",
      settings,
    );
  } catch (error) {
    next(error);
  }
}