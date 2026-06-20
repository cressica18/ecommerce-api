"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("../services/cart.service");
exports.cartController = {
    async getCart(_req, res, next) {
        try {
            const cart = cart_service_1.cartService.getCart();
            res.status(200).json({ success: true, data: cart });
        }
        catch (err) {
            next(err);
        }
    },
    async addItem(req, res, next) {
        try {
            const cart = cart_service_1.cartService.addItem(req.body);
            res.status(201).json({ success: true, data: cart });
        }
        catch (err) {
            next(err);
        }
    },
    async updateItem(req, res, next) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;
            const cart = cart_service_1.cartService.updateItem(productId, quantity);
            res.status(200).json({ success: true, data: cart });
        }
        catch (err) {
            next(err);
        }
    },
    async removeItem(req, res, next) {
        try {
            const { productId } = req.params;
            const cart = cart_service_1.cartService.removeItem(productId);
            res.status(200).json({ success: true, data: cart });
        }
        catch (err) {
            next(err);
        }
    },
    async clearCart(_req, res, next) {
        try {
            cart_service_1.cartService.clearCart();
            res.status(200).json({ success: true, message: "Cart cleared successfully" });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=cart.controller.js.map