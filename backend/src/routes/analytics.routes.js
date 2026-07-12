import express from "express";

import {
  errorAnalytics,
  latencyAnalytics,
  overview,
  recentRequests,
  topApiKeys,
  usageTrend,
} from "../controllers/analytics.controller.js";

import { authenticateAdmin } from "../shared/middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateAdmin);

router.get("/overview", overview);
router.get("/top-api-keys", topApiKeys);
router.get("/recent-requests", recentRequests);
router.get("/usage-trend", usageTrend);
router.get("/errors", errorAnalytics);
router.get("/latency", latencyAnalytics);

export default router;