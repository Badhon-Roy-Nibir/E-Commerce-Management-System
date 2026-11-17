import { CreateOrderItemDto } from "./create-orderitem.dto.js";
declare const PartialOrderItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderItemDto>>;
export declare class PartialOrderItemDto extends PartialOrderItemDto_base {
    orderItemId: number;
}
export {};
