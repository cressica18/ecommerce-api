import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";

export const productController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query["page"] as string) || 1;
      const limit = parseInt(req.query["limit"] as string) || 10;
      const category = req.query["category"] as string | undefined;
      const minPrice = req.query["minPrice"] ? parseFloat(req.query["minPrice"] as string) : undefined;
      const maxPrice = req.query["maxPrice"] ? parseFloat(req.query["maxPrice"] as string) : undefined;

      const result = productService.getAll({ page, limit, category, minPrice, maxPrice });

      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = productService.getById(req.params["id"]!);
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = productService.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = productService.update(req.params["id"]!, req.body);
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      productService.delete(req.params["id"]!);
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
