import { CreateOrderDto } from "./create-order.dto.js";
import { PartialOrderItemDto } from "../../orderitems/dtos/partial-update-orderitem.dto.js";
declare const PartialUpdateOrderdto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateOrderDto, "orderItems">>>;
export declare class PartialUpdateOrderdto extends PartialUpdateOrderdto_base {
    orderItems: PartialOrderItemDto[];
}
export {};
