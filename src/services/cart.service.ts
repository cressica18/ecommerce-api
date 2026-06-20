import { cartItems } from "../data/store";
import { productService } from "./product.service";
import { Cart, CartItem, CartItemWithDetails } from "../types";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

function buildCart(): Cart {
  const itemsWithDetails: CartItemWithDetails[] = cartItems.map((item) => {
    const product = productService.getById(item.productId);
    const subtotal = parseFloat((product.price * item.quantity).toFixed(2));
    return { productId: item.productId, quantity: item.quantity, product, subtotal };
  });

  const total = parseFloat(
    itemsWithDetails.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );

  return { items: itemsWithDetails, total };
}

export const cartService = {
  getCart(): Cart {
    return buildCart();
  },

  addItem(input: AddToCartInput): Cart {
    const product = productService.getById(input.productId);

    if (input.quantity <= 0) {
      throw new BadRequestError("Quantity must be greater than 0");
    }

    if (input.quantity > product.stock) {
      throw new BadRequestError(
        `Insufficient stock. Only ${product.stock} unit(s) available`
      );
    }

    const existing = cartItems.find((item) => item.productId === input.productId);

    if (existing) {
      const newQty = existing.quantity + input.quantity;
      if (newQty > product.stock) {
        throw new BadRequestError(
          `Insufficient stock. Only ${product.stock} unit(s) available`
        );
      }
      existing.quantity = newQty;
    } else {
      const newItem: CartItem = {
        productId: input.productId,
        quantity: input.quantity,
      };
      cartItems.push(newItem);
    }

    return buildCart();
  },

  updateItem(productId: string, quantity: number): Cart {
    const product = productService.getById(productId);

    if (quantity <= 0) {
      throw new BadRequestError("Quantity must be greater than 0");
    }

    if (quantity > product.stock) {
      throw new BadRequestError(
        `Insufficient stock. Only ${product.stock} unit(s) available`
      );
    }

    const index = cartItems.findIndex((item) => item.productId === productId);
    if (index === -1) throw new NotFoundError("Cart item");

    cartItems[index].quantity = quantity;
    return buildCart();
  },

  removeItem(productId: string): Cart {
    const index = cartItems.findIndex((item) => item.productId === productId);
    if (index === -1) throw new NotFoundError("Cart item");
    cartItems.splice(index, 1);
    return buildCart();
  },

  clearCart(): void {
    cartItems.splice(0, cartItems.length);
  },
};
