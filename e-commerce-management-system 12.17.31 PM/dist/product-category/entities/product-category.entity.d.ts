import { Products } from '../../products/entities/products.entity.js';
import type { Relation } from 'typeorm';
export declare class ProductCatagory {
    categoryId: number;
    name: string;
    description: string;
    isActive: boolean;
    product: Relation<Products[]>;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
}
