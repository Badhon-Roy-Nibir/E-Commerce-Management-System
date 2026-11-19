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
import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, Put, UseGuards, } from '@nestjs/common';
import { ProductCatagoryService } from './product-category.service.js';
import { CreateProductCatagoryDto } from './dto/create-product-category.dto.js';
import { UpdateProductCatagoryDto } from './dto/update-product-category.dto.js';
import { PartialUpdateProductCatagoryDto } from './dto/partial-update-product-category.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let ProductCatagoryController = class ProductCatagoryController {
    productCatagoryService;
    constructor(productCatagoryService) {
        this.productCatagoryService = productCatagoryService;
    }
    async createProductCatagory(catagory) {
        return await this.productCatagoryService.createCatagory(catagory);
    }
    async getAllProductCatagories() {
        return await this.productCatagoryService.getAllCatagories();
    }
    async getProductCatagoryById(id) {
        return await this.productCatagoryService.getCatagoryById(id);
    }
    async replaceProductCatagory(catagory, id) {
        return await this.productCatagoryService.replaceCatagory(id, catagory);
    }
    async updateProductCatagoryPartially(catagory, id) {
        return await this.productCatagoryService.updateCatagory(id, catagory);
    }
    async deleteProductCatagory(id) {
        return await this.productCatagoryService.deleteCatagoryById(id);
    }
    async deleteProductCatagorySoft(id) {
        return await this.productCatagoryService.deleteCatagoryByIdSoft(id);
    }
};
__decorate([
    Roles("Admin"),
    Post('create-catagory'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductCatagoryDto]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "createProductCatagory", null);
__decorate([
    Roles("Admin", "Manager", "Customer", "Guest user"),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "getAllProductCatagories", null);
__decorate([
    Roles("Admin", "Manager", "Customer", "Guest user"),
    Get('getCatagory/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "getProductCatagoryById", null);
__decorate([
    Roles("Admin"),
    Put('replaceCatagory/:id'),
    __param(0, Body()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProductCatagoryDto, Number]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "replaceProductCatagory", null);
__decorate([
    Roles("Admin"),
    Patch('updateCatagory/:id'),
    __param(0, Body()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PartialUpdateProductCatagoryDto, Number]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "updateProductCatagoryPartially", null);
__decorate([
    Roles("Admin"),
    Delete('deleteCatagory/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "deleteProductCatagory", null);
__decorate([
    Roles("Admin"),
    Delete('deleteCatagory/soft/:id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductCatagoryController.prototype, "deleteProductCatagorySoft", null);
ProductCatagoryController = __decorate([
    ApiTags('product-category'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('product-catagory'),
    __metadata("design:paramtypes", [ProductCatagoryService])
], ProductCatagoryController);
export { ProductCatagoryController };
//# sourceMappingURL=product-category.controller.js.map