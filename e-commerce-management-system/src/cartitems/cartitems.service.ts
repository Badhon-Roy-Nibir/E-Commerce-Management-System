
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../cart/entities/cart.entity.js';
import { CartItem } from '../cartitems/entities/cartitem.entity.js';

import { CreateCartitemDto } from '../cartitems/dtos/create-cartitem.dto.js';
import { UpdateCartitemDto } from '../cartitems/dtos/update-cartitem.dto.js';

@Injectable()
export class CartitemsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  // Add item to cart
  async addItem(dto: CreateCartitemDto) {
    const userId = Number(dto.userId);
    const productId = Number(dto.productId);
    const quantity = Number(dto.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const cart = await this.cartRepository.findOne({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found. Create a cart first');
    }

    // Check whether the product already exists in the cart
    const existingItem = await this.cartItemRepository.findOne({
      where: {
        cart: { cartId: cart.cartId },
        product: { productId },
      },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartItemRepository.save(existingItem);
    }

    // Create a new cart item
    const item = this.cartItemRepository.create({
      cart: cart,
      product: { productId },
      quantity,
    });

    return this.cartItemRepository.save(item);
  }

  // Get all items of a user's cart
  async getItems(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId: Number(userId) },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user');
    }

    return this.cartItemRepository.find({
      where: {
        cart: { cartId: cart.cartId },
      },
      relations: {
        product: true,
      },
      order: {
        cartItemId: 'DESC',
      },
    });
  }

  // Update cart item quantity
  async updateItem(cartItemId: number, dto: UpdateCartitemDto) {
    const quantity = Number(dto.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const item = await this.cartItemRepository.findOne({
      where: {
        cartItemId: Number(cartItemId),
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = quantity;

    return this.cartItemRepository.save(item);
  }

  // Remove one cart item
  async removeItem(cartItemId: number) {
    const item = await this.cartItemRepository.findOne({
      where: {
        cartItemId: Number(cartItemId),
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(item);

    return {
      message: 'Cart item removed successfully',
    };
  }

  // Clear all items from a user's cart
  async clearCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: Number(userId),
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user');
    }

    await this.cartItemRepository.delete({
      cart: {
        cartId: cart.cartId,
      },
    });

    return {
      message: 'Cart cleared successfully',
    };
  }
}
