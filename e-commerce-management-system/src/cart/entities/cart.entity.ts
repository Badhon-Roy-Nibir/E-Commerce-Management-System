import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { CartItem } from '../../cartitems/entities/cartitem.entity.js';

@Entity('Carts')
export class Cart {

  @PrimaryGeneratedColumn()
  cartId: number;

  @Column({ type: 'int', unique: true })
  userId: number;

  @OneToMany(
    () => CartItem,
    (cartItem) => cartItem.cart,
    { cascade: false },
  )
  cartItems: Relation<CartItem[]>;
}