import type { Product } from "./product";

export type Order = {
    id: string;
    orderTimeMs: number;
    totalCostCents: number;
    products: {
        productId: string;
        quantity: number;
        estimatedDeliveryTimeMs: number;
        product: Product
    }[];
}

export type Orders = Order[];

