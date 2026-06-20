"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const store_1 = require("../data/store");
const product_service_1 = require("./product.service");
const AppError_1 = require("../errors/AppError");
function buildCart() {
    const itemsWithDetails = store_1.cartItems.map((item) => {
        const product = product_service_1.productService.getById(item.productId);
        const subtotal = parseFloat((product.price * item.quantity).toFixed(2));
        return { productId: item.productId, quantity: item.quantity, product, subtotal };
    });
    const total = parseFloat(itemsWithDetails.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
    return { items: itemsWithDetails, total };
}
exports.cartService = {
    getCart() {
        return buildCart();
    },
    addItem(input) {
        const product = product_service_1.productService.getById(input.productId);
        if (input.quantity <= 0) {
            throw new AppError_1.BadRequestError("Quantity must be greater than 0");
        }
        if (input.quantity > product.stock) {
            throw new AppError_1.BadRequestError(`Insufficient stock. Only ${product.stock} unit(s) available`);
        }
        const existing = store_1.cartItems.find((item) => item.productId === input.productId);
        if (existing) {
            const newQty = existing.quantity + input.quantity;
            if (newQty > product.stock) {
                throw new AppError_1.BadRequestError(`Insufficient stock. Only ${product.stock} unit(s) available`);
            }
            existing.quantity = newQty;
        }
        else {
            const newItem = {
                productId: input.productId,
                quantity: input.quantity,
            };
            store_1.cartItems.push(newItem);
        }
        return buildCart();
    },
    updateItem(productId, quantity) {
        const product = product_service_1.productService.getById(productId);
        if (quantity <= 0) {
            throw new AppError_1.BadRequestError("Quantity must be greater than 0");
        }
        if (quantity > product.stock) {
            throw new AppError_1.BadRequestError(`Insufficient stock. Only ${product.stock} unit(s) available`);
        }
        const index = store_1.cartItems.findIndex((item) => item.productId === productId);
        if (index === -1)
            throw new AppError_1.NotFoundError("Cart item");
        store_1.cartItems[index].quantity = quantity;
        return buildCart();
    },
    removeItem(productId) {
        const index = store_1.cartItems.findIndex((item) => item.productId === productId);
        if (index === -1)
            throw new AppError_1.NotFoundError("Cart item");
        store_1.cartItems.splice(index, 1);
        return buildCart();
    },
    clearCart() {
        store_1.cartItems.splice(0, store_1.cartItems.length);
    },
};
//# sourceMappingURL=cart.service.js.map