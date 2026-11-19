var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
let PaymentService = class PaymentService {
    paymentRepo;
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async createPayment(payment) {
        try {
            const Newpayment = this.paymentRepo.create(payment);
            await this.paymentRepo.save(Newpayment);
            return {
                message: 'Payment created successfully',
            };
        }
        catch {
            throw new BadRequestException('Payment failed to create');
        }
    }
    async getAllPayments() {
        return await this.paymentRepo.find({
            order: { createdDate: 'DESC' },
        });
    }
    async getPaymentById(id) {
        const payment = await this.paymentRepo.findOne({
            where: { paymentId: id },
        });
        if (payment !== null) {
            return payment;
        }
        else {
            return `Payment with id ${id} not found`;
        }
    }
    async updatePayment(id, payment) {
        const res = await this.paymentRepo.findOne({
            where: { paymentId: id },
        });
        if (res) {
            const res = (await this.paymentRepo.update(id, payment)).affected;
            if (res != null && res > 0) {
                return `payment with id ${id} is replaced`;
            }
            else {
                return `payment with id ${id} failed to be replaced`;
            }
        }
    }
    async deletePaymentById(id) {
        const res = await (await this.paymentRepo.delete(id)).affected;
        if (res != null && res > 0) {
            return `Payment with id ${id} deleted successfully`;
        }
        else {
            return `Payment with id ${id} not found`;
        }
    }
    async deletePaymentByIdSoft(id) {
        const res = (await this.paymentRepo.softDelete(id)).affected;
        if (res != null && res > 0) {
            return `Payment with id ${id} deleted`;
        }
        else {
            return `Payment with id ${id} not found`;
        }
    }
};
PaymentService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Payment)),
    __metadata("design:paramtypes", [Repository])
], PaymentService);
export { PaymentService };
//# sourceMappingURL=payment.service.js.map