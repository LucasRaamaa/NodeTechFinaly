import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { validateLoginInput } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", validateLoginInput, login);

export default router;
