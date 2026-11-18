import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  provider: string;
 
  @IsOptional()
  @IsString()
  providerReference: string;

  @IsOptional()
 @IsDateString()
 paidDate?: Date;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  billId: number;
}