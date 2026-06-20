import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/order.service";

export const orderController = {
  async createOrder(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = orderService.createOrder();
      res.status(201).json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = orderService.getAll();
      res.status(200).json({ success: true, data: orders });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = orderService.getById(req.params["id"]!);
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  },
};
