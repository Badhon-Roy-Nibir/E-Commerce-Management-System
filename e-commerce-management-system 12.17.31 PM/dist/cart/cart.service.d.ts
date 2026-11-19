import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: Repository<Cart>);
    createCart(createCartDto: CreateCartDto): Promise<Cart>;
    getMyCart(userId: number): Promise<Cart>;
    getAllCarts(): Promise<Cart[]>;
    getCartById(cartId: number): Promise<Cart>;
    deleteCart(userId: number): Promise<{
        message: string;
    }>;
}
