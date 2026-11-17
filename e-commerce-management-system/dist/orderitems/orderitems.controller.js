var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
let OrderitemsController = class OrderitemsController {
    orderitemsService;
    constructor(orderitemsService) {
        this.orderitemsService = orderitemsService;
    }
    async createOrderItem(item) {
        return await this.orderitemsService.createOrderItem(item);
    }
    async getAllOrderItems() {
        return await this.orderitemsService.getAllOrderItems();
    }
    async getOrderItemById(id) {
        return await this.orderitemsService.getOrderItemById(id);
    }
    async updateOrderItem(id, item) {
        return await this.orderitemsService.partiallyupdateOrderItem(id, item);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderitemsController.prototype, "createOrderItem", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderitemsController.prototype, "getAllOrderItems", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderitemsController.prototype, "getOrderItemById", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, PartialOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderitemsController.prototype, "updateOrderItem", null);
OrderitemsController = __decorate([
    ApiTags('OrderItems'),
    ApiBearerAuth(),
    Controller('orderitems'),
    __metadata("design:paramtypes", [OrderitemsService])
], OrderitemsController);
export { OrderitemsController };
//# sourceMappingURL=orderitems.controller.js.map