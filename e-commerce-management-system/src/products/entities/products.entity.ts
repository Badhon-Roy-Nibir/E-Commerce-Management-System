import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';


@Entity("products")
export class Products{

    @PrimaryGeneratedColumn()
    productId:number;

    @Column({
        type:'varchar',
        length:100
    })
    name:string;

    @Column({
        type:'decimal',precision:10,scale:2
    })
    price:number;

    @Column({
        default:0
    })

    stockQuantity:number;
    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @Column()
    categoryId:number;

    @OneToMany(() => OrderItems, (orderItem) => orderItem.product)
    orderItems: Relation<OrderItems>[];

}