import { Products } from "../../products/entities/products.entity.js";
import type { Relation } from 'typeorm';
import { Orders } from "../../orders/entities/order.entity.js";
export declare class OrderItems {
    orderItemId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    product: Relation<Products>;
    order: Relation<Orders>;
}
