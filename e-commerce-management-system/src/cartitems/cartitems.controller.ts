import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CartitemsService } from './cartitems.service.js';
import { CreateCartitemDto } from './dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from './dtos/update-cartitem.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';

@ApiTags('cart-items')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('cart-items')
export class CartitemsController {
  constructor(private readonly cartitemsService: CartitemsService) {}

  @Roles("Customer")
  @Post()
  addItem(@Body() dto: CreateCartitemDto) {
    return this.cartitemsService.addItem(dto);
  }

  @Roles("Customer", "Admin", "Manager")
  @Get('user/:userId')
  getItems(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartitemsService.getItems(userId);
  }

  @Roles("Customer")
  @Patch(':cartItemId')
  updateItem(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
    @Body() dto: UpdateCartitemDto,
  ) {
    return this.cartitemsService.updateItem(cartItemId, dto);
  }

  @Roles("Customer")
  @Delete(':cartItemId')
  removeItem(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
    return this.cartitemsService.removeItem(cartItemId);
  }

  @Roles("Customer")
  @Delete('user/:userId/clear')
  clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartitemsService.clearCart(userId);
  }
}