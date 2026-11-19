import { OrderItems } from '../orderitems/entities/orderitems.entity.js';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity.js';
import { CreateOrderDto } from './dtos/create-order.dto.js';
import { Orders } from './entities/order.entity.js';
import { PartialUpdateOrderdto } from './dtos/partial-update-order.dto.js';
export declare class OrdersService {
    private readonly ordersRepo;
    private readonly orderItemsRepo;
    private readonly productsRepo;
    constructor(ordersRepo: Repository<Orders>, orderItemsRepo: Repository<OrderItems>, productsRepo: Repository<Products>);
    createOrder(order: CreateOrderDto): Promise<Object>;
    getAllOrders(): Promise<Object>;
    getOrderById(id: number): Promise<Object>;
    PartiallyupdateOrder(id: number, order: PartialUpdateOrderdto): Promise<Object | string>;
    deleteOrder(id: number): Promise<Object | string>;
}
