import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItems } from '../orderitems/entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { CreateOrderDto } from './dtos/create-order.dto.js';
import { Orders, OrderStatus } from './entities/order.entity.js';
import { PartialUpdateOrderdto } from './dtos/partial-update-order.dto.js';

@Injectable()
export class OrdersService {

    constructor(@InjectRepository(Orders) private readonly ordersRepo: Repository<Orders>,
                @InjectRepository(OrderItems) private readonly orderItemsRepo: Repository<OrderItems>,
                @InjectRepository(Products)private readonly productsRepo: Repository<Products>,
        ) {}
    
async createOrder(order: CreateOrderDto): Promise< Object> {
    try{
        let subTotal = 0;

    const orderItems: OrderItems[] = [];

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
        },
        relations: {
            orderItems: {
                product: true
            }
        }
    });

    return {
        message: "Order created successfully",
        data: result!
    };

    }catch{
         throw new BadRequestException("Order failed to create");

    }

    
}


async getAllOrders(): Promise<Object> {
    try {

        const allOrders = await this.ordersRepo.find({
            relations: {
                orderItems: {
                    product: true
                }
            }
        });

        return {
            message: 'All orders retrieved successfully',
            data: allOrders
        };

    } catch {
        throw new BadRequestException('Failed to retrieve orders');
    }
}



async PartiallyupdateOrder(id: number,order: PartialUpdateOrderdto): Promise<Object | string> {
    try {
        const or = await this.ordersRepo.findOne({
            where: {orderId: id}
        });

        if (or) {

            const subTotal = Number(or.subTotal);

            const shippingFee = order.shippingFee !== undefined
                ? Number(order.shippingFee)
                : Number(or.shippingFee);

            const discount = order.discount !== undefined
                ? Number(order.discount)
                : Number(or.discount);

            const total = subTotal + shippingFee - discount;

            const updateData = {...(order.shippingFee !== undefined && {shippingFee: shippingFee}),
                ...(order.discount !== undefined && {discount: discount
                }),
                ...(order.address !== undefined && {address: order.address
                }),
                Total: total
            };

            const res = (await this.ordersRepo.update(id,updateData)).affected;

            if (res != null && res > 0) {

                const updatedOrder = await this.ordersRepo.findOne({
                    where: {
                        orderId: id
                    },
                    relations: {
                        orderItems: {
                            product: true
                        }
                    }
                });

                return {
                    message: `Order with ID ${id} updated successfully`,
                    data: updatedOrder!
                };

            } else {
                return `Order with ID ${id} failed to update`;
            }

        } else {
            return `Order with ID ${id} not found`;
        }

    } catch {
        throw new BadRequestException(
            `Order with ID ${id} failed to update`
        );
    }
}



}


    

