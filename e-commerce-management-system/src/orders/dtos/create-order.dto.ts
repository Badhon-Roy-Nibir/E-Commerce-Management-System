import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsPositive,
    ValidateNested,
    Min
} from "class-validator";

import { Type } from "class-transformer";
import { CreateOrderItemDto } from "../../orderitems/dtos/create-orderitem.dto.js";


export class CreateOrderDto {

    

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    shippingFee: number;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    discount: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({
        each: true
    })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @IsNotEmpty({
        message: "userId cannot be empty"
    })
    @IsNumber()
    userId: number;
}