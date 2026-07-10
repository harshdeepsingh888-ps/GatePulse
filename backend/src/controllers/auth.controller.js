import { loginAdmin } from "../services/auth.service.js";
import { successResponse } from "../shared/utils/apiResponse.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await loginAdmin(email, password);

    return successResponse(
      res,
      "Login successful",
      result
    );
  } catch (error) {
    next(error);
  }
}

export async function getCurrentAdmin(req, res, next) {
  try {
    return successResponse(
      res,
      "Authenticated admin retrieved",
      {
        admin: req.admin,
      }
    );
  } catch (error) {
    next(error);
  }
}