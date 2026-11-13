import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from 'typeorm';

@Entity("Address")
export class Address{

    @PrimaryGeneratedColumn()
    addressId: number;

    @IsString({
        message: "City must be string"
    })
    @IsNotEmpty({
        message: "City cannot be empty",
    })
    city: string;

    @IsString({
        message: "Country must be string"
    })
    @IsNotEmpty({
        message: "Country cannot be empty",
    })
    country: string;

    @IsNumber()
    @IsNotEmpty({
        message: "Phone number cannot be empty",
    })
    phone: number; 

    @IsOptional()
    @IsString()
    line1: string;

    @IsOptional()
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