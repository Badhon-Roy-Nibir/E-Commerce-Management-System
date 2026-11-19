import type { Relation } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity.js';
import { Address } from '../../address/entities/address.entity.js';
import { Orders } from '../../orders/entities/order.entity.js';
import { Cart } from '../../cart/entities/cart.entity.js';
export declare class Users {
    userId: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    role: Relation<Roles>;
    address: Relation<Address>[];
    orders: Relation<Orders[]>;
    carts: Relation<Cart>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
