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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { CreateAddressDto } from './dtos/create-address.dto.js';
import { UpdateAddressDto } from './dtos/update-address.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let AddressController = class AddressController {
    addressService;
    constructor(addressService) {
        this.addressService = addressService;
    }
    createAddresss(add) {
        return this.addressService.createAddress(add);
    }
    updateAddress(id, add) {
        return this.addressService.updateAddress(id, add);
    }
    deleteAddress(id) {
        return this.addressService.deleteAddress(id);
    }
    getAddressByUserId(id) {
        return this.addressService.getAddressByUserId(id);
    }
    getAllAddress() {
        return this.addressService.getAllAddress();
    }
    toggleIsDefault(id) {
        return this.addressService.toggleIsDefault(id);
    }
};
__decorate([
    Roles("Customer"),
    Post("Create-address"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "createAddresss", null);
__decorate([
    Roles("Customer"),
    Patch("Update-address/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "updateAddress", null);
__decorate([
    Roles("Customer"),
    Delete("delete-address/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
__decorate([
    Roles("Admin", "Manager"),
    Get('Get-AddressByUserID/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAddressByUserId", null);
__decorate([
    Roles("Admin", "Manager"),
    Get('getAllAddress'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getAllAddress", null);
__decorate([
    Roles("Customer"),
    Patch('toggle/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "toggleIsDefault", null);
AddressController = __decorate([
    ApiTags('address'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('address'),
    __metadata("design:paramtypes", [AddressService])
], AddressController);
export { AddressController };
//# sourceMappingURL=address.controller.js.map