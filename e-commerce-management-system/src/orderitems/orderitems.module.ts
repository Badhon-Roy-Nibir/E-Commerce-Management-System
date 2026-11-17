import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { OrderitemsController } from './orderitems.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from './entities/orderitems.entity.js';
import { Products } from '../products/entities/products.entity.js';
import { Orders } from '../orders/entities/order.entity.js';

@Module({

  imports:[ TypeOrmModule.forFeature([OrderItems,Products, Orders])],
  controllers: [OrderitemsController],
  providers: [OrderitemsService],
})
export class OrderitemsModule {}
