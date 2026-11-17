import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles/roles.decorator.js';


@ApiTags('OrderItems')
@ApiBearerAuth()
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

  @Get(':id')
  async getOrderItemById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
    return await this.orderitemsService.getOrderItemById(id);
  }

   @Patch(':id')
   async updateOrderItem(@Param('id', ParseIntPipe) id: number,
                         @Body() item: PartialOrderItemDto): Promise<Object | string> {

        return await this.orderitemsService.partiallyupdateOrderItem(id, item);
    }
   

}