import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto.js";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialOrderItemDto } from "../../orderitems/dtos/partial-update-orderitem.dto.js";

export class PartialUpdateOrderdto extends PartialType (OmitType(CreateOrderDto, ['orderItems'] as const)){
    
    
    @IsOptional()
    @IsArray()
    @ValidateNested({
        each: true
    })
    @Type(() => PartialOrderItemDto)
    orderItems: PartialOrderItemDto[];

}