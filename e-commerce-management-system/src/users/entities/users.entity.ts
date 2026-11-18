import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm' 
import type { Relation } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity.js';
import { Address } from '../../address/entities/address.entity.js';
import { Orders } from '../../orders/entities/order.entity.js';
import { Cart } from '../../cart/entities/cart.entity.js';
@Entity("Users")
export class Users{

  

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 30,
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,

    })
    password: string; 

    @Column({
        type: "boolean"
    })
    isActive: boolean;



    @ManyToOne(() => Roles, (role) => role.user,{
        nullable: false,
        onDelete: 'CASCADE'
    
    })
    @JoinColumn({ name: "roleId"})
    role: Relation<Roles>;

    @OneToMany(()=>Address, (address)=> address.user)
    address: Relation<Address>[]

    @OneToMany(()=>Orders, (orders)=>orders.users)
    orders: Relation<Orders[]>;


    @OneToOne(()=>Cart, (carts)=> carts.user)
    carts: Relation<Cart>

    



    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
     
    
}