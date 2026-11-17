import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';

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

    @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
    orderItems: Relation<OrderItems[]>;

    
}