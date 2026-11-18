import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from './entities/cartitem.entity';
import { CartitemsController } from './cartitems.controller';
import { CartitemsService } from './cartitems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartitemsController],
  providers: [CartitemsService],
  exports: [CartitemsService],
})
export class CartitemsModule {}
