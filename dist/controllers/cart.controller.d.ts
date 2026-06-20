import { Request, Response, NextFunction } from "express";
export declare const cartController: {
    getCart(_req: Request, res: Response, next: NextFunction): Promise<void>;
    addItem(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateItem(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeItem(req: Request, res: Response, next: NextFunction): Promise<void>;
    clearCart(_req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=cart.controller.d.ts.map