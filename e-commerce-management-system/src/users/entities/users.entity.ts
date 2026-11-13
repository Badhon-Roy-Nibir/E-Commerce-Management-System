import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm' 
import type { Relation } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity.js';
import { Address } from '../../address/entities/address.entity.js';
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
        nullable: false
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



    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
     
    
}