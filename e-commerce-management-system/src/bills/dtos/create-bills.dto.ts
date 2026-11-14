import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateBillsDto{

    @IsString({
        message: "paymentMethod must be string",
    })
    @IsNotEmpty({
        message: "paymentMethod cannot be empty"
    })
    paymentMethod: string;

    @IsString({
        message: "transactionId must be string",
    })
    @IsNotEmpty({
        message: "transactionId cannot be empty"
    })
    transactionId: string;

    @IsString({
        message: "paymentStatus must be string",
    })
    @IsNotEmpty({
        message: "paymentStatus cannot be empty",
    })
    paymentStatus: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty({
        message: "SubTotal cannot be empty",
    })
    subtotal: number;

    @Type(() => Number)
    @IsNotEmpty({
        message: "Dicount mustbe (1-100)%"
    })
    @Min(0)
    @Max(100)
    discount: number;

    @Type(() => Number)
    @IsNotEmpty({
        message: "Shipping fee cannot be empty"
    })
    @IsNumber()
    shippingFee: number;

    @IsNotEmpty({
        message: "tax mustbe (1-100)%"
    })
    @IsNumber()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    tax: number;

    @IsEmpty({
        message: "Total is Automatically calculated."
    })
    total: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    paidAt: Date;


    @IsNumber()
    @IsNotEmpty({
        message: "OrderId Can't be empty"
    })
    orderId: number;
   
}