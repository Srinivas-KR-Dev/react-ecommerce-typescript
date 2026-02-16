import type { Product } from "./product";

export type CartItem = {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    product: Product;
};

export type Cart = CartItem[];

export type LoadCart = () => Promise<void>;





