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
import { Body, Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, UseGuards, } from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(payment) {
        return await this.paymentService.createPayment(payment);
    }
    async getAllPayments() {
        return await this.paymentService.getAllPayments();
    }
    async getPaymentById(id) {
        return await this.paymentService.getPaymentById(id);
    }
    async updatePayment(id, payment) {
        return await this.paymentService.updatePayment(id, payment);
    }
    async deletePayment(id) {
        return await this.paymentService.deletePaymentById(id);
    }
    async deletePaymentByIdSoft(id) {
        return this.paymentService.deletePaymentByIdSoft(id);
    }
};
__decorate([
    Roles("Customer"),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    Roles("Manager", "Admin"),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    Roles("Manager", "Admin", "Customer"),
    Get('payment/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentById", null);
__decorate([
    Roles("Manager", "Admin", "Customer"),
    Patch('updatepayment/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
__decorate([
    Roles("Admin"),
    Delete('deletepayment/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePayment", null);
__decorate([
    Roles("Admin"),
    Delete('deletepayment/soft/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePaymentByIdSoft", null);
PaymentController = __decorate([
    ApiTags('payment'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('payment'),
    __metadata("design:paramtypes", [PaymentService])
], PaymentController);
export { PaymentController };
//# sourceMappingURL=payment.controller.js.map