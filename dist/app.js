"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env["PORT"] || 3000;
// Body parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ success: true, message: "Server is running" });
});
// Routes
app.use("/products", product_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/orders", order_routes_1.default);
// 404 handler (must be after all routes)
app.use(errorHandler_1.notFoundHandler);
// Global error handler (must be last)
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Products API:  http://localhost:${PORT}/products`);
    console.log(`🛒 Cart API:      http://localhost:${PORT}/cart`);
    console.log(`📋 Orders API:    http://localhost:${PORT}/orders`);
});
exports.default = app;
//# sourceMappingURL=app.js.map