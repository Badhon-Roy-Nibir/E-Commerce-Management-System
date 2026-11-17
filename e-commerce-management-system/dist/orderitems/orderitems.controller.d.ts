import { OrderitemsService } from './orderitems.service.js';
import { CreateOrderItemDto } from './dtos/create-orderitem.dto.js';
import { PartialOrderItemDto } from './dtos/partial-update-orderitem.dto.js';
export declare class OrderitemsController {
    private readonly orderitemsService;
    constructor(orderitemsService: OrderitemsService);
    createOrderItem(item: CreateOrderItemDto): Promise<Object>;
    getAllOrderItems(): Promise<Object>;
    getOrderItemById(id: number): Promise<Object>;
    updateOrderItem(id: number, item: PartialOrderItemDto): Promise<Object | string>;
}
