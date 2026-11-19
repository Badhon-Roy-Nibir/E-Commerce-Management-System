import type { Relation } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity.js';
import { Products } from '../../products/entities/products.entity.js';
export declare class CartItem {
    cartItemId: number;
    quantity: number;
    cart: Relation<Cart>;
    product: Relation<Products>;
}
