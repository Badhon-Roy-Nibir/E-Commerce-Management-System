import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from "typeorm";
import { maxLength } from 'class-validator';

@Entity("Roles")
export class Roles{

    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({
        type: "varchar",
        length: 20,
        unique: true,
    })
    name: string;

    @Column({
        type: "varchar",
        default: 4
    })
    description: string;

    @OneToMany(() => Users, (user) => user.role)
    user: Relation<Users>

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
}