import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCatagory } from './entities/product-category.entity.js';
import { ProductCatagoryController } from './product-category.controller.js';
import { ProductCatagoryService } from './product-category.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCatagory])],
  controllers: [ProductCatagoryController],
  providers: [ProductCatagoryService],
  exports: [ProductCatagoryService],
})
export class ProductCatagoryModule {}