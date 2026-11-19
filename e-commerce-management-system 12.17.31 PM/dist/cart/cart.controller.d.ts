import { CartService } from '../cart/cart.service.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    createCart(createCartDto: CreateCartDto): Promise<import("./entities/cart.entity.js").Cart>;
    getAllCarts(): Promise<import("./entities/cart.entity.js").Cart[]>;
    getMyCart(userId: number): Promise<import("./entities/cart.entity.js").Cart>;
    getCartById(cartId: number): Promise<import("./entities/cart.entity.js").Cart>;
    deleteCart(userId: number): Promise<{
        message: string;
    }>;
}
