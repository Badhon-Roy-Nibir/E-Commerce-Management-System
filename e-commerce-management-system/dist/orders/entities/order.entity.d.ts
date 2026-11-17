import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Orders {
    orderId: number;
    status: OrderStatus;
    shippingFee: number;
    discount: number;
    subTotal: number;
    Total: number;
    address: string;
    orderItems: Relation<OrderItems[]>;
}
