import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { CartItem } from './cart-item.entity.js';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  // The Users module belongs to the main group project. We keep userId as a
  // simple column here so this module can be developed and tested separately.
  @Column({ unique: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: Relation<CartItem[]>;
}
