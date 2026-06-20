"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const product_controller_1 = require("../controllers/product.controller");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
const createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(200),
    description: zod_1.z.string().min(1, "Description is required").max(1000),
    price: zod_1.z.number({ required_error: "Price is required" }).positive("Price must be positive"),
    category: zod_1.z.string().min(1, "Category is required"),
    stock: zod_1.z
        .number({ required_error: "Stock is required" })
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
});
const updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    description: zod_1.z.string().min(1).max(1000).optional(),
    price: zod_1.z.number().positive("Price must be positive").optional(),
    category: zod_1.z.string().min(1).optional(),
    stock: zod_1.z.number().int("Stock must be an integer").min(0).optional(),
});
router.get("/", product_controller_1.productController.getAll);
router.get("/:id", product_controller_1.productController.getById);
router.post("/", (0, validate_1.validate)(createProductSchema), product_controller_1.productController.create);
router.put("/:id", (0, validate_1.validate)(updateProductSchema), product_controller_1.productController.update);
router.delete("/:id", product_controller_1.productController.delete);
exports.default = router;
//# sourceMappingURL=product.routes.js.map