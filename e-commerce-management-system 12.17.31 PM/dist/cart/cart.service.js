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
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
let CartService = class CartService {
    cartRepository;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async createCart(createCartDto) {
        const userId = Number(createCartDto.userId);
        if (!Number.isInteger(userId) || userId < 1) {
            throw new BadRequestException('A valid userId is required');
        }
        const oldCart = await this.cartRepository.findOne({
            where: { userId },
            relations: {
                cartItems: true,
            },
        });
        if (oldCart) {
            throw new BadRequestException('This user already has a cart');
        }
        const cart = this.cartRepository.create({ userId });
        return this.cartRepository.save(cart);
    }
    async getMyCart(userId) {
        const cart = await this.cartRepository.findOne({
            where: { userId: Number(userId) },
            relations: {
                cartItems: true,
            },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found for this user');
        }
        return cart;
    }
    async getAllCarts() {
        return this.cartRepository.find({
            relations: {
                cartItems: true,
            },
            order: {
                cartId: 'DESC',
            },
        });
    }
    async getCartById(cartId) {
        const cart = await this.cartRepository.findOne({
            where: { cartId: Number(cartId) },
            relations: {
                cartItems: true,
            },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }
    async deleteCart(userId) {
        const cart = await this.cartRepository.findOne({
            where: { userId: Number(userId) },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found for this user');
        }
        await this.cartRepository.remove(cart);
        return {
            message: 'Cart deleted successfully',
        };
    }
};
CartService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Cart)),
    __metadata("design:paramtypes", [Repository])
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map