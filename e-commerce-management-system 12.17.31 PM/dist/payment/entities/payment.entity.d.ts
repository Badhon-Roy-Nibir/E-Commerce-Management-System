import { Bills } from '../../bills/entities/bills.entity.js';
import type { Relation } from 'typeorm';
export declare class Payment {
    paymentId: number;
    amount: number;
    provider: string;
    providerReference: string;
    paidDate?: Date;
    bill: Relation<Bills>;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
}
