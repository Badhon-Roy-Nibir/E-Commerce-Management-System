import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CartItem } from '../cartitems/entities/cartitem.entity.js';
import { CreateCartitemDto } from '../cartitems/dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from '../cartitems/dtos/update-cartitem.dto.js';
export declare class CartitemsService {
    private cartRepository;
    private cartItemRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>);
    addItem(dto: CreateCartitemDto): Promise<CartItem>;
    getItems(userId: number): Promise<CartItem[]>;
    updateItem(cartItemId: number, dto: UpdateCartitemDto): Promise<CartItem>;
    removeItem(cartItemId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
