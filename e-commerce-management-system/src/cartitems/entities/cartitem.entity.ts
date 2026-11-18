import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity.js';
import { Products } from '../../products/entities/products.entity.js';

@Entity('CartItems')
export class CartItem {

  @PrimaryGeneratedColumn()
  cartItemId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(
    () => Cart,
    (cart) => cart.cartItems,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cartId' })
  cart: Relation<Cart>;

  @ManyToOne(
    () => Products,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'productId' })
  product: Relation<Products>;
}