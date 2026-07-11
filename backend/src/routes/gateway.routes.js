import express from "express";

import { authenticateApiKey } from "../shared/middleware/apiKey.middleware.js";
import { logGatewayRequest } from "../shared/middleware/requestLogger.middleware.js";
import { rateLimitByApiKey } from "../shared/middleware/rateLimiter.middleware.js";
import { successResponse } from "../shared/utils/apiResponse.js";

const router = express.Router();

router.use(authenticateApiKey);
router.use(logGatewayRequest);
router.use(rateLimitByApiKey);

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