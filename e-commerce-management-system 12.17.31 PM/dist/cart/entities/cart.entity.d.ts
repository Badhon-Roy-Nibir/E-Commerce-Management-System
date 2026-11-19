import type { Relation } from 'typeorm';
import { CartItem } from '../../cartitems/entities/cartitem.entity.js';
import { Users } from '../../users/entities/users.entity.js';
export declare class Cart {
    cartId: number;
    userId: number;
    cartItems: Relation<CartItem[]>;
    user: Relation<Users>;
}
