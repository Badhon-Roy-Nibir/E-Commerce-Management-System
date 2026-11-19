import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dtos/create-order.dto.js';
import { Orders } from './entities/order.entity.js';
import { PartialUpdateOrderdto } from './dtos/partial-update-order.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';


@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Roles("Customer")
   @Post()
    async createOrder(@Body() order: CreateOrderDto): Promise<Object> {

        return await this.ordersService.createOrder(order);
    }


    @Roles("Customer", "Manager", "Admin")
    @Get()
    async getAllOrders(): Promise<Object> {
    return await this.ordersService.getAllOrders();
    }

    @Roles("Customer", "Manager", "Admin")
     @Get(':id')
     async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
      return await this.ordersService.getOrderById(id);
    }

    @Roles("Customer")
    @Patch(':id')
    async PartiallyupdateOrder(@Param('id', ParseIntPipe) id: number,
                               @Body() order: PartialUpdateOrderdto): Promise<Object | string> {

    return await this.ordersService.PartiallyupdateOrder(id, order);
    }

    @Roles("Customer")
   @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<Object | string> {
      return await this.ordersService.deleteOrder(id);
    }
}