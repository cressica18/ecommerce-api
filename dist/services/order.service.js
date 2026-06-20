"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const uuid_1 = require("uuid");
const store_1 = require("../data/store");
const cart_service_1 = require("./cart.service");
const AppError_1 = require("../errors/AppError");
exports.orderService = {
    createOrder() {
        // 1. Read cart
        const cart = cart_service_1.cartService.getCart();
        if (cart.items.length === 0) {
            throw new AppError_1.BadRequestError("Cannot create an order from an empty cart");
        }
        // 2 & 3. Validate products exist and check stock
        for (const item of cart.items) {
            const product = store_1.products.find((p) => p.id === item.productId);
            if (!product) {
                throw new AppError_1.NotFoundError(`Product with id "${item.productId}"`);
            }
            // 4. Return 409 if stock is insufficient
            if (item.quantity > product.stock) {
                throw new AppError_1.ConflictError(`Insufficient stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.stock}`);
            }
        }
        // 5. Reduce stock
        for (const item of cart.items) {
            const product = store_1.products.find((p) => p.id === item.productId);
            product.stock -= item.quantity;
            product.updatedAt = new Date().toISOString();
        }
        // 6. Create order
        const orderItems = cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            priceAtPurchase: item.product.price,
            subtotal: parseFloat((item.product.price * item.quantity).toFixed(2)),
        }));
        const total = parseFloat(orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
        const order = {
            id: (0, uuid_1.v4)(),
            items: orderItems,
            total,
            status: "confirmed",
            createdAt: new Date().toISOString(),
        };
        store_1.orders.push(order);
        // 7. Clear cart
        cart_service_1.cartService.clearCart();
        // 8. Return order
        return order;
    },
    getAll() {
        return [...store_1.orders];
    },
    getById(id) {
        const order = store_1.orders.find((o) => o.id === id);
        if (!order)
            throw new AppError_1.NotFoundError("Order");
        return order;
    },
};
//# sourceMappingURL=order.service.js.map