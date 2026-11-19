import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';


@ApiTags('OrderItems')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('orderitems')
export class OrderitemsController {
  constructor(private readonly orderitemsService: OrderitemsService) {}


  @Roles("Customer")
  @Post()  
  async createOrderItem(@Body() item: CreateOrderItemDto): Promise<Object> {
        return await this.orderitemsService.createOrderItem(item);
    }

  @Roles("Customer", "Admin", "Manager")
  @Get()
  async getAllOrderItems(): Promise<Object>{
     return await this.orderitemsService.getAllOrderItems();
  } 


  @Roles("Customer", "Admin", "Manager")
  @Get(':id')
  async getOrderItemById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
    return await this.orderitemsService.getOrderItemById(id);
  }

   @Roles("Customer")
   @Patch(':id')
   async updateOrderItem(@Param('id', ParseIntPipe) id: number,
                         @Body() item: PartialOrderItemDto): Promise<Object | string> {

        return await this.orderitemsService.partiallyupdateOrderItem(id, item);
    }
   

}