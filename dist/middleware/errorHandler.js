"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const AppError_1 = require("../errors/AppError");
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError_1.ValidationError) {
        res.status(400).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
        return;
    }
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    console.error("Unhandled error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
}
//# sourceMappingURL=errorHandler.js.map