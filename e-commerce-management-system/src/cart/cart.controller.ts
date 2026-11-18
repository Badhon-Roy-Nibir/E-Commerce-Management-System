import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CartService } from '../cart/cart.service.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Get('user/:userId')
  getMyCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getMyCart(userId);
  }

  @Get(':cartId')
  getCartById(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.getCartById(cartId);
  }

  @Delete('user/:userId')
  deleteCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.deleteCart(userId);
  }
}