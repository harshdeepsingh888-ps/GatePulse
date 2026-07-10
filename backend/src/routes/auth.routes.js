import express from "express";

import {
  getCurrentAdmin,
  login,
} from "../controllers/auth.controller.js";

import { authenticateAdmin } from "../shared/middleware/auth.middleware.js";
import { validate } from "../shared/middleware/validate.middleware.js";
import { loginSchema } from "../shared/schemas/auth.schema.js";

const router = express.Router();

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authenticateAdmin,
  getCurrentAdmin
);

export default router;