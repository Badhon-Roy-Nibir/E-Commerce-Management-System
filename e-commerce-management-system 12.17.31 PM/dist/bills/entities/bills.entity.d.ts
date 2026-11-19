import { Orders } from "../../orders/entities/order.entity.js";
import type { Relation } from 'typeorm';
import { Payment } from "../../payment/entities/payment.entity.js";
export declare class Bills {
    billId: number;
    paymentMethod: string;
    transactionId: string;
    paymentStatus: string;
    subtotal: number;
    total: number;
    discount: number;
    shippingFee: number;
    tax: number;
    issuedAt: Date;
    paidAt: Date | null;
    orderId: number;
    order: Relation<Orders>;
    payment: Relation<Payment[]>;
}
