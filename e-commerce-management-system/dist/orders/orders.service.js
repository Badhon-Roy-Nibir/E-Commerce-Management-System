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
import { OrderItems } from '../orderitems/entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { Orders, OrderStatus } from './entities/order.entity.js';
let OrdersService = class OrdersService {
    ordersRepo;
    orderItemsRepo;
    productsRepo;
    constructor(ordersRepo, orderItemsRepo, productsRepo) {
        this.ordersRepo = ordersRepo;
        this.orderItemsRepo = orderItemsRepo;
        this.productsRepo = productsRepo;
    }
    async createOrder(order) {
        try {
            let subTotal = 0;
            const orderItems = [];
            for (const item of order.orderItems) {
                const product = await this.productsRepo.findOne({
                    where: {
                        productId: item.productId
                    }
                });
                if (!product) {
                    return `Product with ID ${item.productId} not found`;
                }
                const lineTotal = Number(product.price) * item.quantity;
                subTotal += lineTotal;
                const orderItem = this.orderItemsRepo.create({
                    productName: product.name,
                    quantity: item.quantity,
                    unitPrice: Number(product.price),
                    lineTotal: lineTotal,
                    product: product
                });
                orderItems.push(orderItem);
            }
            const shippingFee = Number(order.shippingFee);
            const discount = Number(order.discount);
            const total = subTotal + shippingFee - discount;
            const or = this.ordersRepo.create({
                status: OrderStatus.PENDING,
                shippingFee: shippingFee,
                discount: discount,
                subTotal: subTotal,
                Total: total,
                address: order.address
            });
            const savedOrder = await this.ordersRepo.save(or);
            for (const item of orderItems) {
                item.order = savedOrder;
            }
            await this.orderItemsRepo.save(orderItems);
            const result = await this.ordersRepo.findOne({
                where: {
                    orderId: savedOrder.orderId
                }, select: {
                    orderItems: {
                        orderItemId: true,
                        quantity: true,
                        product: {
                            name: true,
                        }
                    }
                },
                relations: {
                    orderItems: {
                        product: true
                    }
                }
            });
            return {
                message: "Order created successfully",
                data: result
            };
        }
        catch {
            throw new BadRequestException("Order failed to create");
        }
    }
    async getAllOrders() {
        try {
            const allOrders = await this.ordersRepo.find({
                relations: {
                    orderItems: {
                        product: true
                    }
                }, select: {
                    orderItems: {
                        orderItemId: true,
                        product: {
                            name: true,
                        }
                    },
                }
            });
            return {
                message: 'All orders retrieved successfully',
                data: allOrders
            };
        }
        catch {
            throw new BadRequestException('Failed to retrieve orders');
        }
    }
    async getOrderById(id) {
        try {
            const order = await this.ordersRepo.findOne({
                where: {
                    orderId: id
                },
                select: {
                    orderId: true,
                    status: true,
                    shippingFee: true,
                    discount: true,
                    subTotal: true,
                    Total: true,
                    address: true,
                    orderItems: {
                        orderItemId: true
                    }
                },
                relations: {
                    orderItems: true
                }
            });
            if (!order) {
                return `Order with ID ${id} not found`;
            }
            return {
                message: 'Order retrieved successfully',
                data: order
            };
        }
        catch {
            throw new BadRequestException('Failed to retrieve order');
        }
    }
    async PartiallyupdateOrder(id, order) {
        try {
            const or = await this.ordersRepo.findOne({
                where: { orderId: id }
            });
            if (or) {
                if (order.orderItems !== undefined) {
                    for (const itemData of order.orderItems) {
                        const item = await this.orderItemsRepo.findOne({
                            where: {
                                orderItemId: itemData.orderItemId,
                                order: {
                                    orderId: id
                                }
                            },
                            relations: {
                                product: true
                            }
                        });
                        if (!item) {
                            return `Order item with ID ${itemData.orderItemId} not found in order ${id}`;
                        }
                        const product = itemData.productId !== undefined ? await this.productsRepo.findOne({
                            where: {
                                productId: itemData.productId
                            }
                        }) : item.product;
                        if (!product) {
                            return `Product not found`;
                        }
                        const quantity = itemData.quantity !== undefined ? itemData.quantity : item.quantity;
                        const unitPrice = itemData.productId !== undefined ? Number(product.price) : Number(item.unitPrice);
                        item.product = product;
                        item.productName = product.name;
                        item.quantity = quantity;
                        item.unitPrice = unitPrice;
                        item.lineTotal = unitPrice * quantity;
                        await this.orderItemsRepo.save(item);
                    }
                }
                const allOrderItems = await this.orderItemsRepo.find({
                    where: {
                        order: {
                            orderId: id
                        }
                    }
                });
                const subTotal = allOrderItems.reduce((sum, item) => sum + Number(item.lineTotal), 0);
                const shippingFee = order.shippingFee !== undefined ? Number(order.shippingFee) : Number(or.shippingFee);
                const discount = order.discount !== undefined ? Number(order.discount) : Number(or.discount);
                const total = subTotal + shippingFee - discount;
                const updateData = {
                    ...(order.shippingFee !== undefined && { shippingFee: shippingFee }),
                    ...(order.discount !== undefined && { discount: discount }),
                    ...(order.address !== undefined && { address: order.address }),
                    subTotal: subTotal,
                    Total: total
                };
                const res = (await this.ordersRepo.update(id, updateData)).affected;
                if (res != null && res > 0) {
                    const updatedOrder = await this.ordersRepo.findOne({
                        where: {
                            orderId: id
                        }, select: {
                            orderItems: {
                                orderItemId: true,
                                quantity: true,
                                product: {
                                    name: true,
                                }
                            }
                        },
                        relations: {
                            orderItems: {
                                product: true
                            }
                        }
                    });
                    return {
                        message: `Order with ID ${id} updated successfully`,
                        data: updatedOrder
                    };
                }
                else {
                    return `Order with ID ${id} failed to update`;
                }
            }
            else {
                return `Order with ID ${id} not found`;
            }
        }
        catch (error) {
            throw new BadRequestException(`Order with ID ${id} failed to update`);
        }
    }
    async deleteOrder(id) {
        try {
            const or = await this.ordersRepo.findOne({
                where: {
                    orderId: id
                }
            });
            if (or) {
                const res = (await this.ordersRepo.delete(id)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `Order with ID ${id} deleted successfully`
                    };
                }
                else {
                    return `Order with ID ${id} failed to delete`;
                }
            }
            else {
                return `Order with ID ${id} not found`;
            }
        }
        catch {
            throw new BadRequestException(`Order with ID ${id} failed to delete`);
        }
    }
};
OrdersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Orders)),
    __param(1, InjectRepository(OrderItems)),
    __param(2, InjectRepository(Products)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map