import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async createPayment(payment: CreatePaymentDto) {
    try {
      const Newpayment = this.paymentRepo.create(payment);
     await this.paymentRepo.save(Newpayment);

      return {
        message: 'Payment created successfully',
      };
    } catch {
      throw new BadRequestException('Payment failed to create');
    }
  }

  async getAllPayments() {
    return await this.paymentRepo.find({
      order: { createdDate: 'DESC' },
    });
  }

  async getPaymentById(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { paymentId: id },
    });

    if (payment!==null) {
      return payment;
    }
    else{
    return `Payment with id ${id} not found`;
  }
}

  async updatePayment(id: number, payment:UpdatePaymentDto)
  {
    const res = await this.paymentRepo.findOne({
      where: { paymentId: id },
    });

    if (res) {
      const res = (await this.paymentRepo.update(id, payment)).affected;

      if (res != null && res > 0) {
        return `payment with id ${id} is replaced`;
      } else {
        return `payment with id ${id} failed to be replaced`;
      }
    }
  }

  async deletePaymentById(id: number):Promise<string> {
    const res = await (await this.paymentRepo.delete(id)).affected;

    if (res!=null && res > 0) {
      return `Payment with id ${id} deleted successfully`;
    }
    else{
      return `Payment with id ${id} not found`;
    }
  }

  async deletePaymentByIdSoft(id: number): Promise<string> {
    const res = (await this.paymentRepo.softDelete(id)).affected;

    if (res != null && res > 0) {
      return `Payment with id ${id} deleted`;
    } else {
      return `Payment with id ${id} not found`;
    }
  }
}