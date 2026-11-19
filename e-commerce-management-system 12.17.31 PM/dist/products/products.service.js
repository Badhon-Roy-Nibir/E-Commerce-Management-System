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
import { Products } from './entities/products.entity.js';
import { Like, Repository } from 'typeorm';
let ProductsService = class ProductsService {
    productsRepo;
    constructor(productsRepo) {
        this.productsRepo = productsRepo;
    }
    async createProduct(product) {
        try {
            const pro = this.productsRepo.create(product);
            const saveProduct = await this.productsRepo.save(pro);
            return {
                message: 'Product Created successfully',
                data: saveProduct
            };
        }
        catch {
            throw new BadRequestException('Product failed to create');
        }
    }
    async findAllProducts() {
        try {
            const pro = await this.productsRepo.find({
                select: {
                    productId: true,
                    name: true,
                    price: true,
                    stockQuantity: true,
                },
                relations: {
                    productCategory: true,
                }
            });
            return {
                message: 'Products retrieved successfully',
                count: pro.length,
                data: pro,
            };
        }
        catch {
            throw new BadRequestException('Products are not found');
        }
    }
    async findOneProduct(id) {
        try {
            const pro = await this.productsRepo.findOne({
                where: {
                    productId: id
                }, select: {
                    name: true,
                    price: true,
                    stockQuantity: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            if (!pro) {
                return `Product with ID ${id} is not found`;
            }
            return pro;
        }
        catch {
            throw new BadRequestException(`Product with ${id} is not found`);
        }
    }
    async searchProductByName(name) {
        try {
            const pro = await this.productsRepo.find({
                where: {
                    name: Like(`%${name}%`)
                }, select: {
                    name: true,
                    price: true,
                    stockQuantity: true,
                }
            });
            if (pro.length > 0) {
                return {
                    message: `Products matching "${name}" retrieved successfully`,
                    data: pro
                };
            }
            else {
                return `No products found with name "${name}"`;
            }
        }
        catch {
            throw new BadRequestException(`Failed to search products with name "${name}"`);
        }
    }
    async updateProduct(id, product) {
        try {
            const pro = await this.productsRepo.findOne({ where: { productId: id } });
            if (pro) {
                const res = (await this.productsRepo.update(id, product)).affected;
                if (res != null && res > 0) {
                    const updatedProduct = await this.productsRepo.findOne({
                        where: {
                            productId: id
                        }, select: {
                            productId: true,
                            name: true,
                            price: true,
                            stockQuantity: true,
                        },
                        relations: {
                            productCategory: true,
                        }
                    });
                    return {
                        message: `Product with ID ${id} updated successfully`,
                        data: updatedProduct
                    };
                }
                else {
                    return `Product with ID ${id} failed to be updated`;
                }
            }
            else {
                return `Product with ID ${id} not found`;
            }
        }
        catch {
            throw new BadRequestException(`Product with ID ${id} failed to update`);
        }
    }
    async replaceProduct(id, product) {
        try {
            const pro = await this.productsRepo.findOne({ where: { productId: id } });
            if (pro) {
                const res = (await this.productsRepo.update(id, product)).affected;
                if (res != null && res > 0) {
                    const replaceProduct = await this.productsRepo.findOne({
                        where: {
                            productId: id
                        }, select: {
                            productId: true,
                            name: true,
                            price: true,
                            stockQuantity: true,
                        },
                        relations: {
                            productCategory: true
                        }
                    });
                    return {
                        message: `Product with ID ${id} replaced successfully`,
                        data: replaceProduct
                    };
                }
                else {
                    return `Product with ID ${id} failed to be replaced`;
                }
            }
            else {
                return `Product with ID ${id} not found`;
            }
        }
        catch {
            throw new BadRequestException(`Product with ID ${id} failed to replace`);
        }
    }
    async deleteproductByIdSoft(id) {
        try {
            const pro = await this.productsRepo.findOne({
                where: { productId: id }
            });
            if (pro) {
                const res = (await this.productsRepo.softDelete(id)).affected;
                if (res != null && res > 0) {
                    return `Product with ID ${id} deleted successfully`;
                }
                else {
                    return `Product with ID ${id} failed to delete`;
                }
            }
            else {
                return `Product with ID ${id} not found`;
            }
        }
        catch {
            throw new BadRequestException(`Product with ID ${id} failed to delete`);
        }
    }
};
ProductsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Products)),
    __metadata("design:paramtypes", [Repository])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map