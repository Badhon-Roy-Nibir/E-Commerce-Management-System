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
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills } from './entities/bills.entity.js';
import { Repository } from 'typeorm';
let BillsService = class BillsService {
    billRepo;
    constructor(billRepo) {
        this.billRepo = billRepo;
    }
    async createBill(bill) {
        try {
            const orderId = await this.billRepo.findOne({
                where: {
                    orderId: bill.orderId
                }
            });
            if (orderId) {
                return {
                    message: "Invalid bill! OrderId already exists"
                };
            }
            let total = bill.subtotal - (bill.subtotal * (bill.discount / 100)) + bill.shippingFee + (bill.subtotal * (bill.tax / 100));
            bill.total = total;
            const newBill = await this.billRepo.create(bill);
            await this.billRepo.save(newBill);
            return {
                message: "Bill Generated!",
                data: newBill
            };
        }
        catch {
            throw new BadRequestException("Bills not found!");
        }
    }
    async updateBill(id, bill) {
        try {
            const updateBill = await this.billRepo.findOne({
                where: {
                    billId: id,
                }
            });
            if (!updateBill) {
                return {
                    message: `Bill with id ${id} doesnot exisits`
                };
            }
            if (updateBill.paymentStatus != "Paid" && bill.paymentStatus === "Paid") {
                updateBill.paidAt = new Date();
            }
            Object.assign(updateBill, bill);
            await this.billRepo.save(updateBill);
            return {
                message: `Bill with id ${id} updated`,
                data: updateBill
            };
        }
        catch {
            throw new BadRequestException("Bill not found!");
        }
    }
};
BillsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Bills)),
    __metadata("design:paramtypes", [Repository])
], BillsService);
export { BillsService };
//# sourceMappingURL=bills.service.js.map