import { CartItem } from '../../cartitems/entities/cartitem.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  // User ID is stored as a foreign-key value. The Users module belongs to the main group project.
  @Column({ unique: true })
  userId: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: false })
  cartItems: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
