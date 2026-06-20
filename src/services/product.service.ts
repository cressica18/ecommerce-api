import { v4 as uuidv4 } from "uuid";
import { products } from "../data/store";
import { Product, PaginatedResponse } from "../types";
import { NotFoundError } from "../errors/AppError";

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

export const productService = {
  getAll(filters: ProductFilters): PaginatedResponse<Product> {
    let result = [...products];

    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
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

  getById(id: string): Product {
    const product = products.find((p) => p.id === id);
    if (!product) throw new NotFoundError("Product");
    return product;
  },

  create(input: CreateProductInput): Product {
    const now = new Date().toISOString();
    const product: Product = {
      id: uuidv4(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    products.push(product);
    return product;
  },

  update(id: string, input: UpdateProductInput): Product {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundError("Product");

    const updated: Product = {
      ...products[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    products[index] = updated;
    return updated;
  },

  delete(id: string): void {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundError("Product");
    products.splice(index, 1);
  },
};
