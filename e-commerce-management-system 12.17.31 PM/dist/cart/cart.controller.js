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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CartService } from '../cart/cart.service.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    createCart(createCartDto) {
        return this.cartService.createCart(createCartDto);
    }
    getAllCarts() {
        return this.cartService.getAllCarts();
    }
    getMyCart(userId) {
        return this.cartService.getMyCart(userId);
    }
    getCartById(cartId) {
        return this.cartService.getCartById(cartId);
    }
    deleteCart(userId) {
        return this.cartService.deleteCart(userId);
    }
};
__decorate([
    Roles("Customer"),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "createCart", null);
__decorate([
    Roles("Admin", "Customer", "Manager"),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getAllCarts", null);
__decorate([
    Roles("Admin", "Manager"),
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getMyCart", null);
__decorate([
    Roles("Admin", "Manager"),
    Get(':cartId'),
    __param(0, Param('cartId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCartById", null);
__decorate([
    Roles("Admin", "Manager"),
    Delete('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "deleteCart", null);
CartController = __decorate([
    ApiTags('cats'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('carts'),
    __metadata("design:paramtypes", [CartService])
], CartController);
export { CartController };
//# sourceMappingURL=cart.controller.js.map