import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'ID of the user who owns this cart' })
  @Type(() => Number)
  @IsInt({ message: 'userId must be an integer' })
  @Min(1, { message: 'userId must be greater than 0' })
  userId: number;
}
