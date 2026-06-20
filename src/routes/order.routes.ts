import { Router } from "express";
import { orderController } from "../controllers/order.controller";

const router = Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

export default router;
