"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("../services/product.service");
exports.productController = {
    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query["page"]) || 1;
            const limit = parseInt(req.query["limit"]) || 10;
            const category = req.query["category"];
            const minPrice = req.query["minPrice"] ? parseFloat(req.query["minPrice"]) : undefined;
            const maxPrice = req.query["maxPrice"] ? parseFloat(req.query["maxPrice"]) : undefined;
            const result = product_service_1.productService.getAll({ page, limit, category, minPrice, maxPrice });
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const product = product_service_1.productService.getById(req.params["id"]);
            res.status(200).json({ success: true, data: product });
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const product = product_service_1.productService.create(req.body);
            res.status(201).json({ success: true, data: product });
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const product = product_service_1.productService.update(req.params["id"], req.body);
            res.status(200).json({ success: true, data: product });
        }
        catch (err) {
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            product_service_1.productService.delete(req.params["id"]);
            res.status(200).json({ success: true, message: "Product deleted successfully" });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=product.controller.js.map