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
import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BillsService } from './bills.service.js';
import { CreateBillsDto } from './dtos/create-bills.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
import { UpdateBillsDto } from './dtos/update-bills.dto.js';
let BillsController = class BillsController {
    billsService;
    constructor(billsService) {
        this.billsService = billsService;
    }
    createBill(bill) {
        return this.billsService.createBill(bill);
    }
    updateBill(id, bill) {
        return this.billsService.updateBill(id, bill);
    }
};
__decorate([
    Roles("Admin", "Manager"),
    Post('Generate-Bill'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBillsDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "createBill", null);
__decorate([
    Roles("Admin", "Manager"),
    Patch("Update-Bill/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateBillsDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "updateBill", null);
BillsController = __decorate([
    ApiTags('Bill'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('bills'),
    __metadata("design:paramtypes", [BillsService])
], BillsController);
export { BillsController };
//# sourceMappingURL=bills.controller.js.map