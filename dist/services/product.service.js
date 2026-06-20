"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const uuid_1 = require("uuid");
const store_1 = require("../data/store");
const AppError_1 = require("../errors/AppError");
exports.productService = {
    getAll(filters) {
        let result = [...store_1.products];
        if (filters.category) {
            result = result.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters.minPrice !== undefined) {
            result = result.filter((p) => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            result = result.filter((p) => p.price <= filters.maxPrice);
        }
        const total = result.length;
        const totalPages = Math.ceil(total / filters.limit);
        const offset = (filters.page - 1) * filters.limit;
        const data = result.slice(offset, offset + filters.limit);
        return {
            data,
            meta: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages,
            },
        };
    },
    getById(id) {
        const product = store_1.products.find((p) => p.id === id);
        if (!product)
            throw new AppError_1.NotFoundError("Product");
        return product;
    },
    create(input) {
        const now = new Date().toISOString();
        const product = {
            id: (0, uuid_1.v4)(),
            ...input,
            createdAt: now,
            updatedAt: now,
        };
        store_1.products.push(product);
        return product;
    },
    update(id, input) {
        const index = store_1.products.findIndex((p) => p.id === id);
        if (index === -1)
            throw new AppError_1.NotFoundError("Product");
        const updated = {
            ...store_1.products[index],
            ...input,
            updatedAt: new Date().toISOString(),
        };
        store_1.products[index] = updated;
        return updated;
    },
    delete(id) {
        const index = store_1.products.findIndex((p) => p.id === id);
        if (index === -1)
            throw new AppError_1.NotFoundError("Product");
        store_1.products.splice(index, 1);
    },
};
//# sourceMappingURL=product.service.js.map