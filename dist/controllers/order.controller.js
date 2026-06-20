"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("../services/order.service");
exports.orderController = {
    async createOrder(_req, res, next) {
        try {
            const order = order_service_1.orderService.createOrder();
            res.status(201).json({ success: true, data: order });
        }
        catch (err) {
            next(err);
        }
    },
    async getAll(_req, res, next) {
        try {
            const orders = order_service_1.orderService.getAll();
            res.status(200).json({ success: true, data: orders });
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const order = order_service_1.orderService.getById(req.params["id"]);
            res.status(200).json({ success: true, data: order });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=order.controller.js.map