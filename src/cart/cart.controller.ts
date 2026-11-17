import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service.js';
import { CreateCartDto } from './dtos/create-cart.dto.js';
import { AddCartItemDto } from './dtos/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dtos/update-cart-item.dto.js';
import { CartQueryDto } from './dtos/cart-query.dto.js';

@ApiTags('Cart')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create one cart for a user' })
  createCart(@Body() dto: CreateCartDto) {
    return this.cartService.createCart(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carts with pagination' })
  findAll(@Query() query: CartQueryDto) {
    return this.cartService.findAllCarts(query);
  }

  @Get(':cartId')
  @ApiOperation({ summary: 'Get a cart with its items and subtotal' })
  findOne(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.findCartById(cartId);
  }

  @Post(':cartId/items')
  @ApiOperation({ summary: 'Add a product to a cart' })
  addItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cartService.addItem(cartId, dto);
  }

  @Get(':cartId/items')
  @ApiOperation({ summary: 'Get cart items with pagination' })
  findItems(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Query() query: CartQueryDto,
  ) {
    return this.cartService.findCartItems(cartId, query);
  }

  @Patch(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Change the quantity of a cart item' })
  updateItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(cartId, itemId, dto);
  }

  @Delete(':cartId/items/:itemId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove one item from a cart' })
  removeItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItem(cartId, itemId);
  }

  @Delete(':cartId/items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove all items but keep the cart' })
  clearCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.clearCart(cartId);
  }

  @Delete(':cartId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a cart and its items' })
  deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.deleteCart(cartId);
  }
}
