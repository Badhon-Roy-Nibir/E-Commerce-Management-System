import { CreateOrderItemDto } from "../../orderitems/dtos/create-orderitem.dto.js";
export declare class CreateOrderDto {
    shippingFee: number;
    discount: number;
    address: string;
    orderItems: CreateOrderItemDto[];
    userId: number;
}
