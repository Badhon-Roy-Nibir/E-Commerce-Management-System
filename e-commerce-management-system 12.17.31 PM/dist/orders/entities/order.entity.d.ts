import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import type { Relation } from 'typeorm';
import { Users } from "../../users/entities/users.entity.js";
import { Bills } from "../../bills/entities/bills.entity.js";
export declare class Orders {
    orderId: number;
    status: string;
    shippingFee: number;
    discount: number;
    subTotal: number;
    Total: number;
    address: string;
    orderItems: Relation<OrderItems[]>;
    users: Relation<Users>;
    bill: Relation<Bills>;
}
