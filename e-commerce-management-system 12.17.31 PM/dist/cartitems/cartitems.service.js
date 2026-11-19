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
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CartItem } from '../cartitems/entities/cartitem.entity.js';
let CartitemsService = class CartitemsService {
    cartRepository;
    cartItemRepository;
    constructor(cartRepository, cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }
    async addItem(dto) {
        const userId = Number(dto.userId);
        const productId = Number(dto.productId);
        const quantity = Number(dto.quantity);
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new BadRequestException('Quantity must be at least 1');
        }
        const cart = await this.cartRepository.findOne({
            where: { userId },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found. Create a cart first');
        }
        const existingItem = await this.cartItemRepository.findOne({
            where: {
                cart: { cartId: cart.cartId },
                product: { productId },
            },
        });
        if (existingItem) {
            existingItem.quantity += quantity;
            return this.cartItemRepository.save(existingItem);
        }
        const item = this.cartItemRepository.create({
            cart: cart,
            product: { productId },
            quantity,
        });
        return this.cartItemRepository.save(item);
    }
    async getItems(userId) {
        const cart = await this.cartRepository.findOne({
            where: { userId: Number(userId) },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found for this user');
        }
        return this.cartItemRepository.find({
            where: {
                cart: { cartId: cart.cartId },
            },
            relations: {
                product: true,
            },
            order: {
                cartItemId: 'DESC',
            },
        });
    }
    async updateItem(cartItemId, dto) {
        const quantity = Number(dto.quantity);
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new BadRequestException('Quantity must be at least 1');
        }
        const item = await this.cartItemRepository.findOne({
            where: {
                cartItemId: Number(cartItemId),
            },
        });
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }
        item.quantity = quantity;
        return this.cartItemRepository.save(item);
    }
    async removeItem(cartItemId) {
        const item = await this.cartItemRepository.findOne({
            where: {
                cartItemId: Number(cartItemId),
            },
        });
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }
        await this.cartItemRepository.remove(item);
        return {
            message: 'Cart item removed successfully',
        };
    }
    async clearCart(userId) {
        const cart = await this.cartRepository.findOne({
            where: {
                userId: Number(userId),
            },
        });
        if (!cart) {
            throw new NotFoundException('Cart not found for this user');
        }
        await this.cartItemRepository.delete({
            cart: {
                cartId: cart.cartId,
            },
        });
        return {
            message: 'Cart cleared successfully',
        };
    }
};
CartitemsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Cart)),
    __param(1, InjectRepository(CartItem)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], CartitemsService);
export { CartitemsService };
//# sourceMappingURL=cartitems.service.js.map