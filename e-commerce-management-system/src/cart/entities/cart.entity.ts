import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { CartItem } from '../../cartitems/entities/cartitem.entity.js';
import { Users } from '../../users/entities/users.entity.js';

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

  @OneToOne(()=> Users, (user)=>user.carts,{
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'userId'
  })
  user: Relation<Users>
}