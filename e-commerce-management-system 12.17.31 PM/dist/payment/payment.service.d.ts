import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
export declare class PaymentService {
    private readonly paymentRepo;
    constructor(paymentRepo: Repository<Payment>);
    createPayment(payment: CreatePaymentDto): Promise<{
        message: string;
    }>;
    getAllPayments(): Promise<Payment[]>;
    getPaymentById(id: number): Promise<string | Payment>;
    updatePayment(id: number, payment: UpdatePaymentDto): Promise<string | undefined>;
    deletePaymentById(id: number): Promise<string>;
    deletePaymentByIdSoft(id: number): Promise<string>;
}
