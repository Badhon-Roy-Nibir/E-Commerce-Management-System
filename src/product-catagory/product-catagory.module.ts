import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCatagory } from './entities/product-catagory.entity.js';
import { ProductCatagoryController } from './product-catagory.controller.js';
import { ProductCatagoryService } from './product-catagory.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCatagory])],
  controllers: [ProductCatagoryController],
  providers: [ProductCatagoryService],
  exports: [ProductCatagoryService],
})
export class ProductCatagoryModule {}