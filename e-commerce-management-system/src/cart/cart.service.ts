
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CreateCartDto } from '../cart/dtos/create-cart.dto.js';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    const userId = Number(createCartDto.userId);

    if (!Number.isInteger(userId) || userId < 1) {
      throw new BadRequestException('A valid userId is required');
    }

    const oldCart = await this.cartRepository.findOne({
      where: { userId },
      relations: {
        cartItems: true,
      },
    });

    if (oldCart) {
      throw new BadRequestException('This user already has a cart');
    }

    const cart = this.cartRepository.create({ userId });

    return this.cartRepository.save(cart);
  }

  async getMyCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId: Number(userId) },
      relations: {
        cartItems: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user');
    }

    return cart;
  }

  async getAllCarts() {
    return this.cartRepository.find({
      relations: {
        cartItems: true,
      },
      order: {
        cartId: 'DESC',
      },
    });
  }

  async getCartById(cartId: number) {
    const cart = await this.cartRepository.findOne({
      where: { cartId: Number(cartId) },
      relations: {
        cartItems: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async deleteCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId: Number(userId) },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user');
    }

    await this.cartRepository.remove(cart);

    return {
      message: 'Cart deleted successfully',
    };
  }
}
