import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CartItem } from '../cartitems/entities/cartitem.entity.js';
import { CartitemsController } from './cartitems.controller.js';
import { CartitemsService } from './cartitems.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartitemsController],
  providers: [CartitemsService],
  exports: [CartitemsService],
})
export class CartitemsModule {}