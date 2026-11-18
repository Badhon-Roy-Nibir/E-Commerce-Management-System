import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCatagoryDto } from './create-product-catagory.dto.js';

export class PartialUpdateProductCatagoryDto extends PartialType(
  CreateProductCatagoryDto,
) {}

