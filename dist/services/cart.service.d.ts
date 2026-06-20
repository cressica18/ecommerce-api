import { Cart } from "../types";
export interface AddToCartInput {
    productId: string;
    quantity: number;
}
export declare const cartService: {
    getCart(): Cart;
    addItem(input: AddToCartInput): Cart;
    updateItem(productId: string, quantity: number): Cart;
    removeItem(productId: string): Cart;
    clearCart(): void;
};
//# sourceMappingURL=cart.service.d.ts.map