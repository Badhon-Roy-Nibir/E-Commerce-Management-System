import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price:number;

    @IsInt()
    @Min(0)
    @Type(() => Number)
    stockQuantity:number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    categoryId:number;

   


}