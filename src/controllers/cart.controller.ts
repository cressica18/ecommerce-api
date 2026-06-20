import { Request, Response, NextFunction } from "express";
import { cartService } from "../services/cart.service";

export const cartController = {
  async getCart(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = cartService.getCart();
      res.status(200).json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  },

  async addItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cart = cartService.addItem(req.body);
      res.status(201).json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  },

  async updateItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      const cart = cartService.updateItem(productId!, quantity);
      res.status(200).json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  },

  async removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId } = req.params;
      const cart = cartService.removeItem(productId!);
      res.status(200).json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  },

  async clearCart(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      cartService.clearCart();
      res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (err) {
      next(err);
    }
  },
};
