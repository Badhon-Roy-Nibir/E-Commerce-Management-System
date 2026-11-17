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
}
