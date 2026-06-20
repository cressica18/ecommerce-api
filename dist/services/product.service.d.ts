import { Product, PaginatedResponse } from "../types";
export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
}
export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}
export interface UpdateProductInput {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
}
export declare const productService: {
    getAll(filters: ProductFilters): PaginatedResponse<Product>;
    getById(id: string): Product;
    create(input: CreateProductInput): Product;
    update(id: string, input: UpdateProductInput): Product;
    delete(id: string): void;
};
//# sourceMappingURL=product.service.d.ts.map