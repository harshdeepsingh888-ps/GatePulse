import express from "express";
import { successResponse } from "../shared/utils/apiResponse.js";

const router = express.Router();

router.get("/health", (req, res) => {
  return successResponse(res, "GatePulse backend is running", {
    timestamp: new Date().toISOString(),
  });
});

export default router;