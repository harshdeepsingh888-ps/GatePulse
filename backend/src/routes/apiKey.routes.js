import express from "express";

import {
  create,
  list,
  regenerate,
  revoke,
} from "../controllers/apiKey.controller.js";

import { authenticateAdmin } from "../shared/middleware/auth.middleware.js";
import { validate } from "../shared/middleware/validate.middleware.js";
import { createApiKeySchema } from "../shared/schemas/apiKey.schema.js";

const router = express.Router();

router.use(authenticateAdmin);

router.post(
  "/",
  validate(createApiKeySchema),
  create
);

router.get(
  "/",
  list
);

router.patch(
  "/:id/revoke",
  revoke
);

router.post(
  "/:id/regenerate",
  regenerate
);

export default router;