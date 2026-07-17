import express from "express";

import { settingsOverview } from "../controllers/settings.controller.js";
import { authenticateAdmin } from "../shared/middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateAdmin);

router.get("/", settingsOverview);

export default router;