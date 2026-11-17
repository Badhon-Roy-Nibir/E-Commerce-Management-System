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
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItems } from './entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { Orders } from '../orders/entities/order.entity.js';
let OrderitemsService = class OrderitemsService {
    orderItemsRepo;
    productsRepo;
    ordersRepo;
    constructor(orderItemsRepo, productsRepo, ordersRepo) {
        this.orderItemsRepo = orderItemsRepo;
        this.productsRepo = productsRepo;
        this.ordersRepo = ordersRepo;
    }
    async createOrderItem(item) {
        try {
            const product = await this.productsRepo.findOne({
                where: {
                    productId: item.productId
                }
            });
            if (!product) {
                return `Product with ID ${item.productId} not found`;
            }
            const lineTotal = Number(product.price) * item.quantity;
            const orderItem = await this.orderItemsRepo.create({
                productName: product.name,
                quantity: item.quantity,
                unitPrice: Number(product.price),
                lineTotal: lineTotal,
                product: product
            });
            const savedItem = await this.orderItemsRepo.save(orderItem);
            return {
                message: 'Order item created successfully',
                data: {
                    orderItemId: savedItem.orderItemId,
                    orderId: savedItem.order.orderId,
                    productName: savedItem.productName,
                    quantity: savedItem.quantity,
                    unitPrice: savedItem.unitPrice,
                    lineTotal: savedItem.lineTotal
                }
            };
        }
        catch {
            throw new BadRequestException('Order item failed to create');
        }
    }
    async getAllOrderItems() {
        try {
            const allOrderItems = await this.orderItemsRepo.find({
                relations: {
                    product: true,
                    order: true
                },
                select: {
                    order: {
                        orderId: true
                    },
                    product: {
                        productId: true,
                        name: true,
                    }
                }
            });
            return {
                message: 'All order items retrieved successfully',
                data: allOrderItems
            };
        }
        catch {
            throw new BadRequestException('Failed to retrieve order items');
        }
    }
    async getOrderItemById(id) {
        try {
            const orderItem = await this.orderItemsRepo.findOne({
                where: {
                    orderItemId: id
                },
                select: {
                    order: {
                        orderId: true
                    },
                    product: {
                        productId: true,
                    }
                },
                relations: {
                    order: true,
                    product: true,
                }
            });
            if (!orderItem) {
                return `Order Item with ID ${id} not found`;
            }
            return {
                message: `Order Item with ID ${id} retrieved successfully`,
                data: orderItem
            };
        }
        catch {
            throw new BadRequestException('Failed to retrieve order item');
        }
    }
    async partiallyupdateOrderItem(id, item) {
        try {
            const oldItem = await this.orderItemsRepo.findOne({
                where: {
                    orderItemId: id
                },
                relations: {
                    order: true,
                    product: true
                },
            });
            if (oldItem) {
                let product = await this.productsRepo.findOne({
                    where: {
                        productId: oldItem.product.productId
                    },
                });
                if (item.productId !== undefined) {
                    const newProduct = await this.productsRepo.findOne({
                        where: {
                            productId: item.productId
                        }
                    });
                    if (!newProduct) {
                        return `Product with ID ${item.productId} not found`;
                    }
                    product = newProduct;
                }
                if (!product) {
                    return 'Product not found';
                }
                const quantity = item.quantity !== undefined ? item.quantity : oldItem.quantity;
                const lineTotal = Number(product.price) * quantity;
                oldItem.productName = product.name;
                oldItem.product = product;
                oldItem.quantity = quantity;
                oldItem.unitPrice = Number(product.price);
                oldItem.lineTotal = lineTotal;
                const savedItem = await this.orderItemsRepo.save(oldItem);
                const allItems = await this.orderItemsRepo.find({
                    where: {
                        order: {
                            orderId: oldItem.order.orderId
                        }
                    }
                });
                const subTotal = allItems.reduce((sum, currentItem) => sum + Number(currentItem.lineTotal), 0);
                const shippingFee = Number(oldItem.order.shippingFee);
                const discount = Number(oldItem.order.discount);
                const total = subTotal + shippingFee - discount;
                await this.ordersRepo.update(oldItem.order.orderId, {
                    subTotal: subTotal,
                    Total: total
                });
                return {
                    message: `Order item with ID ${id} updated successfully`,
                    data: {
                        orderItemId: savedItem.orderItemId,
                        productName: savedItem.productName,
                        quantity: savedItem.quantity,
                        unitPrice: savedItem.unitPrice,
                        lineTotal: savedItem.lineTotal,
                        productId: savedItem.product.productId,
                        orderId: savedItem.order.orderId,
                    }
                };
            }
            else {
                return `Order item with ID ${id} not found`;
            }
        }
        catch {
            throw new BadRequestException(`Order item with ID ${id} failed to update`);
        }
    }
};
OrderitemsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(OrderItems)),
    __param(1, InjectRepository(Products)),
    __param(2, InjectRepository(Orders)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], OrderitemsService);
export { OrderitemsService };
//# sourceMappingURL=orderitems.service.js.map