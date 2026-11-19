import { CartitemsService } from './cartitems.service.js';
import { CreateCartitemDto } from './dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from './dtos/update-cartitem.dto.js';
export declare class CartitemsController {
    private readonly cartitemsService;
    constructor(cartitemsService: CartitemsService);
    addItem(dto: CreateCartitemDto): Promise<import("./entities/cartitem.entity.js").CartItem>;
    getItems(userId: number): Promise<import("./entities/cartitem.entity.js").CartItem[]>;
    updateItem(cartItemId: number, dto: UpdateCartitemDto): Promise<import("./entities/cartitem.entity.js").CartItem>;
    removeItem(cartItemId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
