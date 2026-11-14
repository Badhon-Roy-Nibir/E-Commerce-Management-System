import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from 'typeorm';

@Entity("Address")
export class Address{

    @PrimaryGeneratedColumn()
    addressId: number;

    @Column({
        type: "varchar"
    })
    city: string;

    @Column({
        type: "varchar"
    })
    country: string;

    @Column({
        type: 'varchar'
    })
    phone: string; 

    @Column({
        type: "varchar",
        nullable: true
    })
    line1: string;

    @Column({
        type: 'boolean'
    })
    isDefault: boolean;

    @ManyToOne(()=>Users, (user)=>user.address)
    @JoinColumn({
        name: "userId"
    })
    user: Relation<Users>


    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;

}