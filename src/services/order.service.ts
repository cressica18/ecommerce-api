import { v4 as uuidv4 } from "uuid";
import { orders, products } from "../data/store";
import { cartService } from "./cart.service";
import { Order, OrderItem } from "../types";
import { NotFoundError, ConflictError, BadRequestError } from "../errors/AppError";

export const orderService = {
  createOrder(): Order {
    // 1. Read cart
    const cart = cartService.getCart();

    if (cart.items.length === 0) {
      throw new BadRequestError("Cannot create an order from an empty cart");
    }

    // 2 & 3. Validate products exist and check stock
    for (const item of cart.items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new NotFoundError(`Product with id "${item.productId}"`);
      }

      // 4. Return 409 if stock is insufficient
      if (item.quantity > product.stock) {
        throw new ConflictError(
          `Insufficient stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.stock}`
        );
      }
    }

    // 5. Reduce stock
    for (const item of cart.items) {
      const product = products.find((p) => p.id === item.productId)!;
      product.stock -= item.quantity;
      product.updatedAt = new Date().toISOString();
    }

    // 6. Create order
    const orderItems: OrderItem[] = cart.items.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
      subtotal: parseFloat((item.product.price * item.quantity).toFixed(2)),
    }));

    const total = parseFloat(
      orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
    );

    const order: Order = {
      id: uuidv4(),
      items: orderItems,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    // 7. Clear cart
    cartService.clearCart();

    // 8. Return order
    return order;
  },

  getAll(): Order[] {
    return [...orders];
  },

  getById(id: string): Order {
    const order = orders.find((o) => o.id === id);
    if (!order) throw new NotFoundError("Order");
    return order;
  },
};
