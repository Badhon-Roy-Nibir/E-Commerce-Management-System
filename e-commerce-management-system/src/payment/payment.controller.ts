import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { PaymentService } from './payment.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';

@ApiTags('payment')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Roles("Customer")
  @Post()
  async createPayment(@Body() payment: CreatePaymentDto) {
    return await this.paymentService.createPayment(payment);
  }

  @Roles("Manager", "Admin")
  @Get()
  async getAllPayments() {
    return await this.paymentService.getAllPayments();
  }

  @Roles("Manager", "Admin", "Customer")
  @Get('payment/:id')
  async getPaymentById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paymentService.getPaymentById(id);
  }

  @Roles("Manager", "Admin", "Customer")
  @Patch('updatepayment/:id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() payment: UpdatePaymentDto,
  ) {
    return await this.paymentService.updatePayment(id, payment);
  }

  @Roles("Admin")
  @Delete('deletepayment/:id')
  async deletePayment(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paymentService.deletePaymentById(id);
  }
  @Roles("Admin")
  @Delete('deletepayment/soft/:id')
  async deletePaymentByIdSoft(@Param('id') id: number) {
    return this.paymentService.deletePaymentByIdSoft(id);
  }
}