import { IsIn, IsOptional } from "class-validator";

export class UpdateBillsDto{

    @IsOptional()
    @IsIn(["Pending", "Paid", "Failed"])
    paymentStatus: string;

}