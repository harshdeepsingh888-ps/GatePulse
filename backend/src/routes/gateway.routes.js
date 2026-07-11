import express from "express";

import { authenticateApiKey } from "../shared/middleware/apiKey.middleware.js";
import { successResponse } from "../shared/utils/apiResponse.js";

const router = express.Router();

router.use(authenticateApiKey);

router.get("/profile", (req, res) => {
  return successResponse(
    res,
    "Gateway authentication successful",
    {
      apiKey: req.apiKey,
    }
  );
});

export default router;