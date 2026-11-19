import { PaymentService } from './payment.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(payment: CreatePaymentDto): Promise<{
        message: string;
    }>;
    getAllPayments(): Promise<import("./entities/payment.entity.js").Payment[]>;
    getPaymentById(id: number): Promise<string | import("./entities/payment.entity.js").Payment>;
    updatePayment(id: number, payment: UpdatePaymentDto): Promise<string | undefined>;
    deletePayment(id: number): Promise<string>;
    deletePaymentByIdSoft(id: number): Promise<string>;
}
