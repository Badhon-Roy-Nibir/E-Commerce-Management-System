import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCatagoryDto } from './create-product-category.dto.js';

export class PartialUpdateProductCatagoryDto extends PartialType(
  CreateProductCatagoryDto,
) {}
