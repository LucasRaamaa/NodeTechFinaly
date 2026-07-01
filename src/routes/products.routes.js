import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validateCreateProduct,
  validateIdParam,
} from "../validators/products.validator.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", validateIdParam, getProduct);
router.post("/create", authMiddleware, validateCreateProduct, createProduct);
router.delete("/:id", authMiddleware, validateIdParam, deleteProduct);

export default router;
