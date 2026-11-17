import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
export declare class Products {
    productId: number;
    name: string;
    price: number;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    categoryId: number;
    orderItems: Relation<OrderItems>[];
}
