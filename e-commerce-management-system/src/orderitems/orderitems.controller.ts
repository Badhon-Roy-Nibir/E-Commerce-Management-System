import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';

@Controller('orderitems')
export class OrderitemsController {
  constructor(private readonly orderitemsService: OrderitemsService) {}

  @Post()  
  async createOrderItem(@Body() item: CreateOrderItemDto): Promise<Object> {
        return await this.orderitemsService.createOrderItem(item);
    }

  @Get()
  async getAllOrderItems(): Promise<Object>{
     return await this.orderitemsService.getAllOrderItems();
  } 

   @Patch(':id')
   async updateOrderItem(@Param('id', ParseIntPipe) id: number,
                         @Body() item: PartialOrderItemDto): Promise<Object | string> {

        return await this.orderitemsService.updateOrderItem(id, item);
    }
   

}
