import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Products } from '../../products/entities/products.entity.js';
import type { Relation } from 'typeorm';

@Entity('product_categories')
export class ProductCatagory {

  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;



  @OneToMany(()=>Products, (products)=>products.productCategory)
  product: Relation<Products[]>


  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({
  nullable: true,})
  deletedDate: Date;
}