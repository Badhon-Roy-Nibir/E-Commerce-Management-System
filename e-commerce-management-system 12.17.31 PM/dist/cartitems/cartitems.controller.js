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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CartitemsService } from './cartitems.service.js';
import { CreateCartitemDto } from './dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from './dtos/update-cartitem.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let CartitemsController = class CartitemsController {
    cartitemsService;
    constructor(cartitemsService) {
        this.cartitemsService = cartitemsService;
    }
    addItem(dto) {
        return this.cartitemsService.addItem(dto);
    }
    getItems(userId) {
        return this.cartitemsService.getItems(userId);
    }
    updateItem(cartItemId, dto) {
        return this.cartitemsService.updateItem(cartItemId, dto);
    }
    removeItem(cartItemId) {
        return this.cartitemsService.removeItem(cartItemId);
    }
    clearCart(userId) {
        return this.cartitemsService.clearCart(userId);
    }
};
__decorate([
    Roles("Customer"),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCartitemDto]),
    __metadata("design:returntype", void 0)
], CartitemsController.prototype, "addItem", null);
__decorate([
    Roles("Customer", "Admin", "Manager"),
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartitemsController.prototype, "getItems", null);
__decorate([
    Roles("Customer"),
    Patch(':cartItemId'),
    __param(0, Param('cartItemId', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateCartitemDto]),
    __metadata("design:returntype", void 0)
], CartitemsController.prototype, "updateItem", null);
__decorate([
    Roles("Customer"),
    Delete(':cartItemId'),
    __param(0, Param('cartItemId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartitemsController.prototype, "removeItem", null);
__decorate([
    Roles("Customer"),
    Delete('user/:userId/clear'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartitemsController.prototype, "clearCart", null);
CartitemsController = __decorate([
    ApiTags('cart-items'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('cart-items'),
    __metadata("design:paramtypes", [CartitemsService])
], CartitemsController);
export { CartitemsController };
//# sourceMappingURL=cartitems.controller.js.map