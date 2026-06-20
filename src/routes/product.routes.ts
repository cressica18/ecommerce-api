import { Router } from "express";
import { z } from "zod";
import { productController } from "../controllers/product.controller";
import { validate } from "../middleware/validate";

const router = Router();

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required").max(1000),
  price: z.number({ required_error: "Price is required" }).positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z
    .number({ required_error: "Stock is required" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

const updateProductSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(1000).optional(),
  price: z.number().positive("Price must be positive").optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int("Stock must be an integer").min(0).optional(),
});

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", validate(createProductSchema), productController.create);
router.put("/:id", validate(updateProductSchema), productController.update);
router.delete("/:id", productController.delete);

export default router;
