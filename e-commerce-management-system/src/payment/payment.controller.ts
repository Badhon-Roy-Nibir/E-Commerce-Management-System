import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { PaymentService } from './payment.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  async createPayment(@Body() payment: CreatePaymentDto) {
    return await this.paymentService.createPayment(payment);
  }

  @Get()
  async getAllPayments() {
    return await this.paymentService.getAllPayments();
  }

  @Get('payment/:id')
  async getPaymentById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paymentService.getPaymentById(id);
  }

  @Patch('updatepayment/:id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() payment: UpdatePaymentDto,
  ) {
    return await this.paymentService.updatePayment(id, payment);
  }

  @Delete('deletepayment/:id')
  async deletePayment(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paymentService.deletePaymentById(id);
  }
  @Delete('deletepayment/soft/:id')
  async deletePaymentByIdSoft(@Param('id') id: number) {
    return this.paymentService.deletePaymentByIdSoft(id);
  }
}