import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CartitemsService } from './cartitems.service.js';
import { CreateCartitemDto } from './dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from './dtos/update-cartitem.dto.js';

@Controller('cart-items')
export class CartitemsController {
  constructor(private readonly cartitemsService: CartitemsService) {}

  @Post()
  addItem(@Body() dto: CreateCartitemDto) {
    return this.cartitemsService.addItem(dto);
  }

  @Get('user/:userId')
  getItems(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartitemsService.getItems(userId);
  }

  @Patch(':cartItemId')
  updateItem(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
    @Body() dto: UpdateCartitemDto,
  ) {
    return this.cartitemsService.updateItem(cartItemId, dto);
  }

  @Delete(':cartItemId')
  removeItem(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
    return this.cartitemsService.removeItem(cartItemId);
  }

  @Delete('user/:userId/clear')
  clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartitemsService.clearCart(userId);
  }
}