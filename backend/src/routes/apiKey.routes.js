import express from "express";

import { create } from "../controllers/apiKey.controller.js";
import { authenticateAdmin } from "../shared/middleware/auth.middleware.js";
import { validate } from "../shared/middleware/validate.middleware.js";
import { createApiKeySchema } from "../shared/schemas/apiKey.schema.js";

const router = express.Router();

router.post(
  "/",
  authenticateAdmin,
  validate(createApiKeySchema),
  create
);

export default router;