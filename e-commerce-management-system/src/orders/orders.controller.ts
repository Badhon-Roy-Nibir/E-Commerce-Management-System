import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dtos/create-order.dto.js';
import { Orders } from './entities/order.entity.js';
import { PartialUpdateOrderdto } from './dtos/partial-update-order.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

   @Post()
    async createOrder(@Body() order: CreateOrderDto): Promise<Object> {

        return await this.ordersService.createOrder(order);
    }

    @Get()
    async getAllOrders(): Promise<Object> {
    return await this.ordersService.getAllOrders();
    }

    @Patch(':id')
    async PartiallyupdateOrder(@Param('id', ParseIntPipe) id: number,
                               @Body() order: PartialUpdateOrderdto): Promise<Object | string> {

    return await this.ordersService.PartiallyupdateOrder(id, order);
}
}
