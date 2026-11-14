import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class CreateAddressDto{

    @IsString({
        message: "City must be string"
    })
    @IsNotEmpty({
        message: "City cannot be empty",
    })
    city: string;
    
    @IsString({
        message: "Country must be string"
    })
    @IsNotEmpty({
        message: "Country cannot be empty",
    })
    country: string;
    
    @IsNotEmpty({
        message: "Phone number cannot be empty",
    })
    @MinLength(11,{
        message: "phone number should be 11 digits"
    })
    @MaxLength(11)
    phone: string; 
    
    @IsOptional()
    @IsString()
    line1: string;
    
    @IsOptional()
    isDefault: boolean;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

}