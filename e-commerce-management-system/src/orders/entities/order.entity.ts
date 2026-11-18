import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';



@Entity("Order")
export class Orders{

    @PrimaryGeneratedColumn()
    orderId:number;

    @Column({
        default: "PENDING",
    })
    status:string;

    @Column({
        type: "decimal", 
        precision: 10, 
        scale: 2,
        default:0,
    })
    shippingFee: number;

    @Column({
        type: "decimal", 
        precision: 10, 
        scale: 2, 
        default: 0
    })
    discount:number;

    @Column({
        type: "decimal", 
        precision: 10, 
        scale: 2
    })
    subTotal:number;

    @Column({
        type: "decimal", 
        precision: 10, 
        scale: 2
    })
    Total:number;

    @Column({
        type:'varchar',
    })
    address:string;

    @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
    orderItems: Relation<OrderItems[]>;

    

    @ManyToOne(()=> Users, (users)=> users.orders)
    @JoinColumn({
        name: 'userId'
    })
    users: Relation<Users>




    
}