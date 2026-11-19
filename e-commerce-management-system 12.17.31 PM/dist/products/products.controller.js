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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { PartialUpdateProductdto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async createProduct(product) {
        return await this.productsService.createProduct(product);
    }
    async findProducts() {
        return await this.productsService.findAllProducts();
    }
    async findOneProduct(id) {
        return await this.productsService.findOneProduct(id);
    }
    async searchProductByName(name) {
        return await this.productsService.searchProductByName(name);
    }
    async updateProductPartially(product, id) {
        return await this.productsService.updateProduct(id, product);
    }
    async replaceProduct(product, id) {
        return await this.productsService.updateProduct(id, product);
    }
    async deleteProductByIdSoft(id) {
        return await this.productsService.deleteproductByIdSoft(id);
    }
};
__decorate([
    ApiBearerAuth(),
    Roles("Admin"),
    Post('create-product'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    Get('all-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findProducts", null);
__decorate([
    Get('findOne/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOneProduct", null);
__decorate([
    Get('searchByName'),
    __param(0, Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "searchProductByName", null);
__decorate([
    ApiBearerAuth(),
    Roles("Manager", "Admin"),
    Patch(':id'),
    __param(0, Body()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PartialUpdateProductdto, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProductPartially", null);
__decorate([
    ApiBearerAuth(),
    Roles("Manager", "Admin"),
    Put(':id'),
    __param(0, Body()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProductDto, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "replaceProduct", null);
__decorate([
    ApiBearerAuth(),
    Roles("Manager", "Admin"),
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProductByIdSoft", null);
ProductsController = __decorate([
    ApiTags('Products'),
    Controller('products'),
    __metadata("design:paramtypes", [ProductsService])
], ProductsController);
export { ProductsController };
//# sourceMappingURL=products.controller.js.map