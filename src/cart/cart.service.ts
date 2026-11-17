import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity.js';
import { CartItem } from './entities/cart-item.entity.js';
import { Products } from '../products/entities/products.entity.js';
import { CreateCartDto } from './dtos/create-cart.dto.js';
import { AddCartItemDto } from './dtos/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dtos/update-cart-item.dto.js';
import { CartQueryDto } from './dtos/cart-query.dto.js';

type DatabaseError = QueryFailedError & { driverError?: { code?: string } };

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    private readonly dataSource: DataSource,
  ) {}

  async createCart(dto: CreateCartDto) {
    const existingCart = await this.cartRepository.findOne({
      where: { userId: dto.userId },
    });

    if (existingCart) {
      throw new ConflictException('This user already has a cart');
    }

    try {
      const cart = this.cartRepository.create({ userId: dto.userId });
      const savedCart = await this.cartRepository.save(cart);
      return { message: 'Cart created successfully', data: savedCart };
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async findAllCarts(query: CartQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const [carts, total] = await this.cartRepository.findAndCount({
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'Carts retrieved successfully',
      data: carts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findCartById(cartId: number) {
    const cart = await this.cartRepository.findOne({ where: { cartId } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} was not found`);
    }

    const items = await this.cartItemRepository.find({
      where: { cart: { cartId } },
      relations: { product: true },
      order: { cartItemId: 'ASC' },
    });

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    );

    return {
      message: 'Cart retrieved successfully',
      data: {
        ...cart,
        items: items.map((item) => ({
          cartItemId: item.cartItemId,
          productId: item.product.productId,
          productName: item.product.name,
          unitPrice: Number(item.product.price),
          quantity: item.quantity,
          lineTotal: Number(item.product.price) * item.quantity,
        })),
        subtotal: Number(subtotal.toFixed(2)),
      },
    };
  }

  async addItem(cartId: number, dto: AddCartItemDto) {
    return this.dataSource.transaction(async (manager) => {
      const cartRepo = manager.getRepository(Cart);
      const itemRepo = manager.getRepository(CartItem);
      const productRepo = manager.getRepository(Products);

      const cart = await cartRepo.findOne({ where: { cartId } });
      if (!cart) {
        throw new NotFoundException(`Cart with ID ${cartId} was not found`);
      }

      const product = await productRepo.findOne({
        where: { productId: dto.productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${dto.productId} was not found`);
      }

      const existingItem = await itemRepo.findOne({
        where: {
          cart: { cartId },
          product: { productId: dto.productId },
        },
        relations: { product: true },
      });

      const newQuantity = (existingItem?.quantity || 0) + dto.quantity;
      if (newQuantity > product.stockQuantity) {
        throw new BadRequestException(
          `Only ${product.stockQuantity} item(s) are available in stock`,
        );
      }

      if (existingItem) {
        existingItem.quantity = newQuantity;
        await itemRepo.save(existingItem);
      } else {
        const newItem = itemRepo.create({
          quantity: dto.quantity,
          cart,
          product,
        });
        await itemRepo.save(newItem);
      }

      cart.updatedAt = new Date();
      await cartRepo.save(cart);

      return {
        message: existingItem
          ? 'Cart item quantity increased successfully'
          : 'Product added to cart successfully',
        data: await itemRepo.find({
          where: { cart: { cartId } },
          relations: { product: true },
          order: { cartItemId: 'ASC' },
        }),
      };
    });
  }

  async findCartItems(cartId: number, query: CartQueryDto) {
    await this.ensureCartExists(cartId);
    const page = query.page || 1;
    const limit = query.limit || 10;
    const [items, total] = await this.cartItemRepository.findAndCount({
      where: { cart: { cartId } },
      relations: { product: true },
      order: { cartItemId: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'Cart items retrieved successfully',
      data: items.map((item) => ({
        cartItemId: item.cartItemId,
        productId: item.product.productId,
        productName: item.product.name,
        unitPrice: Number(item.product.price),
        quantity: item.quantity,
        lineTotal: Number(item.product.price) * item.quantity,
      })),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateItem(cartId: number, itemId: number, dto: UpdateCartItemDto) {
    return this.dataSource.transaction(async (manager) => {
      const itemRepo = manager.getRepository(CartItem);
      const cartRepo = manager.getRepository(Cart);
      const item = await itemRepo.findOne({
        where: { cartItemId: itemId, cart: { cartId } },
        relations: { product: true, cart: true },
      });

      if (!item) {
        throw new NotFoundException(`Cart item with ID ${itemId} was not found in cart ${cartId}`);
      }
      if (dto.quantity > item.product.stockQuantity) {
        throw new BadRequestException(
          `Only ${item.product.stockQuantity} item(s) are available in stock`,
        );
      }

      item.quantity = dto.quantity;
      await itemRepo.save(item);
      item.cart.updatedAt = new Date();
      await cartRepo.save(item.cart);

      return { message: 'Cart item updated successfully', data: item };
    });
  }

  async removeItem(cartId: number, itemId: number) {
    const item = await this.cartItemRepository.findOne({
      where: { cartItemId: itemId, cart: { cartId } },
      relations: { cart: true },
    });
    if (!item) {
      throw new NotFoundException(`Cart item with ID ${itemId} was not found in cart ${cartId}`);
    }

    await this.cartItemRepository.remove(item);
    item.cart.updatedAt = new Date();
    await this.cartRepository.save(item.cart);
    return { message: 'Cart item removed successfully' };
  }

  async clearCart(cartId: number) {
    await this.ensureCartExists(cartId);
    await this.cartItemRepository.delete({ cart: { cartId } });
    await this.cartRepository.update(cartId, { updatedAt: new Date() });
    return { message: 'Cart cleared successfully' };
  }

  async deleteCart(cartId: number) {
    const cart = await this.cartRepository.findOne({ where: { cartId } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} was not found`);
    }
    await this.cartRepository.remove(cart);
    return { message: 'Cart deleted successfully' };
  }

  private async ensureCartExists(cartId: number) {
    const cart = await this.cartRepository.findOne({ where: { cartId } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} was not found`);
    }
    return cart;
  }

  private handleDatabaseError(error: unknown): never {
    const dbError = error as DatabaseError;
    if (dbError?.driverError?.code === '23505') {
      throw new ConflictException('A cart already exists for this user');
    }
    if (dbError?.driverError?.code === '23503') {
      throw new BadRequestException('The referenced user or product does not exist');
    }
    throw error;
  }
}
