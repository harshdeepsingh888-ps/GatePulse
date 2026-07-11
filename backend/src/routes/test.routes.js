import express from "express";
import { z } from "zod";

import { authenticateApiKey } from "../shared/middleware/apiKey.middleware.js";
import { validate } from "../shared/middleware/validate.middleware.js";
import { successResponse } from "../shared/utils/apiResponse.js";

const router = express.Router();

const testSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

router.post(
  "/test-validation",
  validate(testSchema),
  (req, res) => {
    return successResponse(res, "Validation passed", {
      received: req.body,
    });
  }
);

router.get(
  "/test-api-key",
  authenticateApiKey,
  (req, res) => {
    return successResponse(
      res,
      "API key authentication successful",
      {
        apiKey: req.apiKey,
      }
    );
  }
);

export default router;