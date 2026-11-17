import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Cart } from './cart.entity.js';
import { Products } from '../../products/entities/products.entity.js';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemId: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cartId' })
  cart: Relation<Cart>;

  @ManyToOne(() => Products, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Products>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
