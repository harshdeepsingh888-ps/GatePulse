import { ZodError } from "zod";
import { errorResponse } from "../utils/apiResponse.js";

export function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        return errorResponse(res, "Validation failed", 400, errors);
      }

      next(error);
    }
  };
}