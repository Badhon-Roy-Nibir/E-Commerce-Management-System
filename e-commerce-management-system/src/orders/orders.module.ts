import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from '../orderitems/entities/orderitems.entity.js';
import { Orders } from './entities/order.entity.js';
import { Products } from '../products/entities/products.entity.js';



@Module({

  imports:[TypeOrmModule.forFeature([Orders,OrderItems, Products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
