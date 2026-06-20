import { Router } from "express";
import { z } from "zod";
import { cartController } from "../controllers/cart.controller";
import { validate } from "../middleware/validate";

const router = Router();

const addToCartSchema = z.object({
  productId: z.string().uuid("productId must be a valid UUID"),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

const updateCartItemSchema = z.object({
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

router.get("/", cartController.getCart);
router.post("/", validate(addToCartSchema), cartController.addItem);
router.put("/:productId", validate(updateCartItemSchema), cartController.updateItem);
router.delete("/:productId", cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router;
