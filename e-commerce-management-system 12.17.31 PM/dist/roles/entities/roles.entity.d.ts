import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from "typeorm";
export declare class Roles {
    roleId: number;
    name: string;
    description: string;
    user: Relation<Users>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
