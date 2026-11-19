import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CartService } from '../cart/cart.service.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';



@ApiTags('cats')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles("Customer")
  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Roles("Admin", "Customer", "Manager")
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Roles("Admin", "Manager")
  @Get('user/:userId')
  getMyCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getMyCart(userId);
  }

  @Roles("Admin", "Manager")
  @Get(':cartId')
  getCartById(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.getCartById(cartId);
  }

  @Roles("Admin", "Manager")
  @Delete('user/:userId')
  deleteCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.deleteCart(userId);
  }
}