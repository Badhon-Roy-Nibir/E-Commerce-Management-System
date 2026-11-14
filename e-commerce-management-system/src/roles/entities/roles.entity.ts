import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from "typeorm";

@Entity("Roles")
export class Roles{

    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({
        type: "varchar",
        length: 8,
        unique: true
    })
    name: string;

    @Column({
        type: "varchar"
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