import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "../../orders/entities/order.entity.js";
import type { Relation } from 'typeorm';

@Entity("Bills")
export class Bills{

    @PrimaryGeneratedColumn()
    billId: number;

    @Column()
    paymentMethod: string;

    @Column({
        nullable: true
    })
    transactionId: string;

    @Column()
    paymentStatus: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    subtotal: number;

    @Column({
        nullable: false
    })
    total: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0
    })
    discount: number;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    })
    shippingFee: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0
    })
    tax: number;

    @CreateDateColumn()
    issuedAt: Date;

    @Column({
        type: "timestamp",
        nullable: true
    })
    paidAt: Date | null;

    @Column({
        unique: true
    })
    orderId: number;

    @OneToOne(()=> Orders, (orders)=>orders.bill)
    @JoinColumn({
        name: 'orderId'
    })
    order: Relation<Orders>

}