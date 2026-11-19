import { OrderItems } from './entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { Orders } from '../orders/entities/order.entity.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';
export declare class OrderitemsService {
    private readonly orderItemsRepo;
    private readonly productsRepo;
    private readonly ordersRepo;
    constructor(orderItemsRepo: Repository<OrderItems>, productsRepo: Repository<Products>, ordersRepo: Repository<Orders>);
    createOrderItem(item: CreateOrderItemDto): Promise<Object>;
    getAllOrderItems(): Promise<Object>;
    getOrderItemById(id: number): Promise<Object>;
    partiallyupdateOrderItem(id: number, item: PartialOrderItemDto): Promise<Object | string>;
}
