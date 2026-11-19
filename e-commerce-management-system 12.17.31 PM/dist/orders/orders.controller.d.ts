import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dtos/create-order.dto.js';
import { PartialUpdateOrderdto } from './dtos/partial-update-order.dto.js';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(order: CreateOrderDto): Promise<Object>;
    getAllOrders(): Promise<Object>;
    getOrderById(id: number): Promise<Object>;
    PartiallyupdateOrder(id: number, order: PartialUpdateOrderdto): Promise<Object | string>;
    deleteOrder(id: number): Promise<Object | string>;
}
