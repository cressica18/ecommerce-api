"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const cart_controller_1 = require("../controllers/cart.controller");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
const addToCartSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid("productId must be a valid UUID"),
    quantity: zod_1.z
        .number({ required_error: "Quantity is required" })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),
});
const updateCartItemSchema = zod_1.z.object({
    quantity: zod_1.z
        .number({ required_error: "Quantity is required" })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),
});
router.get("/", cart_controller_1.cartController.getCart);
router.post("/", (0, validate_1.validate)(addToCartSchema), cart_controller_1.cartController.addItem);
router.put("/:productId", (0, validate_1.validate)(updateCartItemSchema), cart_controller_1.cartController.updateItem);
router.delete("/:productId", cart_controller_1.cartController.removeItem);
router.delete("/", cart_controller_1.cartController.clearCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map