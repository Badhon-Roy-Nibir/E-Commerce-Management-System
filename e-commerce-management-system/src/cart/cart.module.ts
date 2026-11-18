import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CartController } from '../cart/cart.controller.js';
import { CartService } from '../cart/cart.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}