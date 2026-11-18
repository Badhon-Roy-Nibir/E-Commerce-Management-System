import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
import { Users } from "../../users/entities/users.entity.js";
import { Delete } from '@nestjs/common';

export enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

@Entity("Order")

export class Orders{

    @PrimaryGeneratedColumn()
    orderId:number;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status:OrderStatus;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    shippingFee: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    discount:number;

    @Column({ type: "decimal", precision: 10, scale: 2})
    subTotal:number;

    @Column({ type: "decimal", precision: 10, scale: 2})
    Total:number;


    @Column()
    address:string;

    @OneToMany(() => OrderItems, (orderItem) => orderItem.order,{
        nullable: false,
        onDelete: "CASCADE"
    })
    orderItems: Relation<OrderItems[]>;
    


    
    @ManyToOne(()=> Users, (users)=> users.orders)
    @JoinColumn({
        name: 'userId'
    })
    users: Relation<Users>



    
}