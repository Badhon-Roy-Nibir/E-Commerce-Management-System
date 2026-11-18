import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
import { ProductCatagory } from "../../product-category/entities/product-category.entity.js";


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



    @ManyToOne(()=>ProductCatagory, (productCategory)=>productCategory.product)
    @JoinColumn({
        name: "categoryId"
    })
    productCategory: Relation<ProductCatagory>

    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;


    @OneToMany(() => OrderItems, (orderItem) => orderItem.product)
    orderItems: Relation<OrderItems>[];

}