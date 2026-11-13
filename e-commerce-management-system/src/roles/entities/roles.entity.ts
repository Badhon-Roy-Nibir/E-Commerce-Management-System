import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from "typeorm";

@Entity("Roles")
export class Roles{

    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({
        type: "varchar",
        length: 8
    })
    name: string;

    @Column({
        type: "varchar"
    })
    description: string;

    @OneToOne(() => Users, (user) => user.role)
    @JoinColumn()
    user: Relation<Users>

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
}