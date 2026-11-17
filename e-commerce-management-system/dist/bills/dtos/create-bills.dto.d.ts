export declare class CreateBillsDto {
    paymentMethod: string;
    transactionId: string;
    paymentStatus: string;
    subtotal: number;
    discount: number;
    shippingFee: number;
    tax: number;
    total: number;
    paidAt: Date;
    orderId: number;
}
