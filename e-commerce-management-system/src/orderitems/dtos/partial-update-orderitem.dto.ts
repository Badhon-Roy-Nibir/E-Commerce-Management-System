import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderItemDto } from "./create-orderitem.dto.js";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class PartialOrderItemDto extends PartialType(CreateOrderItemDto)

{
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    orderItemId: number;
}