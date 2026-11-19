import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
import { ProductCatagory } from "../../product-category/entities/product-category.entity.js";
export declare class Products {
    productId: number;
    name: string;
    price: number;
    stockQuantity: number;
    productCategory: Relation<ProductCatagory>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    orderItems: Relation<OrderItems>[];
}
