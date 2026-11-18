import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from './entities/cartitem.entity';
import { CreateCartitemDto } from './dtos/create-cartitem.dto';
import { UpdateCartitemDto } from './dtos/update-cartitem.dto';

@Injectable()
export class CartitemsService {
  constructor(
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async addItem(dto: CreateCartitemDto) {
    const cart = await this.cartRepository.findOne({ where: { userId: Number(dto.userId) } });
    if (!cart) throw new NotFoundException('Cart not found. Create a cart first');
    if (!Number.isInteger(Number(dto.quantity)) || dto.quantity < 1) throw new BadRequestException('Quantity must be at least 1');

    const existingItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.cartId, productId: Number(dto.productId) },
    });
    if (existingItem) {
      existingItem.quantity += Number(dto.quantity);
      return this.cartItemRepository.save(existingItem);
    }
    const item = this.cartItemRepository.create({
      cartId: cart.cartId,
      productId: Number(dto.productId),
      quantity: Number(dto.quantity),
    });
    return this.cartItemRepository.save(item);
  }

  async getItems(userId: number) {
    const cart = await this.cartRepository.findOne({ where: { userId: Number(userId) } });
    if (!cart) throw new NotFoundException('Cart not found for this user');
    return this.cartItemRepository.find({ where: { cartId: cart.cartId }, order: { cartItemId: 'DESC' } });
  }

  async updateItem(cartItemId: number, dto: UpdateCartitemDto) {
    const item = await this.cartItemRepository.findOne({ where: { cartItemId: Number(cartItemId) } });
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = Number(dto.quantity);
    return this.cartItemRepository.save(item);
  }

  async removeItem(cartItemId: number) {
    const item = await this.cartItemRepository.findOne({ where: { cartItemId: Number(cartItemId) } });
    if (!item) throw new NotFoundException('Cart item not found');
    await this.cartItemRepository.remove(item);
    return { message: 'Cart item removed successfully' };
  }

  async clearCart(userId: number) {
    const cart = await this.cartRepository.findOne({ where: { userId: Number(userId) } });
    if (!cart) throw new NotFoundException('Cart not found for this user');
    await this.cartItemRepository.delete({ cartId: cart.cartId });
    return { message: 'Cart cleared successfully' };
  }
}
