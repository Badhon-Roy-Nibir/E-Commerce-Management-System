import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Products } from "../../products/entities/products.entity.js";
import type { Relation } from 'typeorm';
import { Orders } from "../../orders/entities/order.entity.js";


@Entity("order_items")
export class OrderItems {

    @PrimaryGeneratedColumn()
    orderItemId: number;
   
<<<<<<< HEAD
    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
=======
    @Column({
      type:'varchar',
      length:100
    })
    productName: string;

    @Column({
      default:0
    
    })
    quantity: number;

    @Column({
      type: 'decimal', 
      precision: 10, 
      scale: 2
    })
    unitPrice: number;

    @Column({
      type: 'decimal', 
      precision: 10, 
      scale: 2
    })
>>>>>>> origin/Anima
    lineTotal: number;


    @ManyToOne(() => Products, (product) => product.orderItems, {
      nullable: false,
      onDelete: 'RESTRICT',
    })
     
    @JoinColumn({ name: 'productId' })
    product: Relation<Products> ;
<<<<<<< HEAD
 

      @ManyToOne(() => Orders, (order) => order.orderItems, {
        nullable: false,
        onDelete: 'CASCADE'
      })
      @JoinColumn({ name: 'orderId' })
      order: Relation<Orders>;  
=======
    
    @ManyToOne(() => Orders, (order) => order.orderItems, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'orderId' })
    order: Relation<Orders>;
 

      
>>>>>>> origin/Anima

    
}