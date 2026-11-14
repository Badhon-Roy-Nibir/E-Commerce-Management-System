import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItems } from './entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { Orders } from '../orders/entities/order.entity.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';

@Injectable()
export class OrderitemsService {

    constructor(@InjectRepository(OrderItems) private readonly orderItemsRepo: Repository<OrderItems>,
                @InjectRepository(Products)private readonly productsRepo: Repository<Products>,
                @InjectRepository(Orders) private readonly ordersRepo: Repository<Orders>,
    ) {}

    async createOrderItem(item: CreateOrderItemDto): Promise<Object> {
    try {
        const product = await this.productsRepo.findOne({
            where: {
                productId: item.productId
            }
        });

        if (!product) {
            return`Product with ID ${item.productId} not found`;
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
            data: savedItem
        };

    } catch {
        throw new BadRequestException('Order item failed to create');
    }
}


async getAllOrderItems(): Promise<Object> {
    try {

        const allOrderItems = await this.orderItemsRepo.find({
            relations: {
                product: true,
                order: true
            }
        });

        return {
            message: 'All order items retrieved successfully',
            data: allOrderItems
        };

    } catch {
        throw new BadRequestException('Failed to retrieve order items');
    }
}



async updateOrderItem(id: number,item: PartialOrderItemDto): Promise<Object | string> {

    try {
        const oldItem = await this.orderItemsRepo.findOne({
            where: {
                orderItemId: id
            },
            relations: {
                order: true,
                product: true
            }
        });

        if (oldItem) {

            let product = oldItem.product;

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

            const quantity = item.quantity !== undefined
                ? item.quantity
                : oldItem.quantity;

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

            const subTotal = allItems.reduce((sum, currentItem) => sum + Number(currentItem.lineTotal),0);

            const shippingFee = Number(oldItem.order.shippingFee);
            const discount = Number(oldItem.order.discount);

            const total = subTotal + shippingFee - discount;

            await this.ordersRepo.update(
                oldItem.order.orderId,
                {
                    subTotal: subTotal,
                    Total: total
                }
            );

            return {
                message: `Order item with ID ${id} updated successfully`,
                data: savedItem
            };

        } else {
            return `Order item with ID ${id} not found`;
        }

    } catch {
        throw new BadRequestException(`Order item with ID ${id} failed to update`);
    }
}


}
