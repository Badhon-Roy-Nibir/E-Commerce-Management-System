import type { Relation } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity.js';
import { Address } from '../../address/entities/address.entity.js';
export declare class Users {
    userId: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    role: Relation<Roles>;
    address: Relation<Address>[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
