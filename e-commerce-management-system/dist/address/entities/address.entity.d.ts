import { Users } from "../../users/entities/users.entity.js";
import type { Relation } from 'typeorm';
export declare class Address {
    addressId: number;
    city: string;
    country: string;
    phone: string;
    line1: string;
    isDefault: boolean;
    user: Relation<Users>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
