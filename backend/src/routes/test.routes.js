import express from "express";
import { z } from "zod";

import { validate } from "../shared/middleware/validate.middleware.js";
import { successResponse } from "../shared/utils/apiResponse.js";

const router = express.Router();

const testSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

router.post("/test-validation", validate(testSchema), (req, res) => {
  return successResponse(res, "Validation passed", {
    received: req.body,
  });
});

export default router;