import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Products } from "../../products/entities/products.entity.js";
import type { Relation } from 'typeorm';
import { Orders } from "../../orders/entities/order.entity.js";


@Entity("order_items")
export class OrderItems {

    @PrimaryGeneratedColumn()
    orderItemId: number;
   
    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    lineTotal: number;


  @ManyToOne(() => Products, (product) => product.orderItems, {
    nullable: false,
    onDelete: 'CASCADE',    
    })
  @JoinColumn({ name: 'productId' })
  product: Relation<Products> ;


   @ManyToOne(() => Orders, (order) => order.orderItems, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'orderId' })
    order: Relation<Orders>;  

    
}