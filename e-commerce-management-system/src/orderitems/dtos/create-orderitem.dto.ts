import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class CreateOrderItemDto {

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    productId: number;

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    quantity: number;

   
}