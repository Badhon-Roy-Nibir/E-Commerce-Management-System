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
import { ProductCatagory } from './entities/product-category.entity.js';
let ProductCatagoryService = class ProductCatagoryService {
    catagoryRepo;
    constructor(catagoryRepo) {
        this.catagoryRepo = catagoryRepo;
    }
    async createCatagory(catagory) {
        try {
            const newCatagory = this.catagoryRepo.create(catagory);
            await this.catagoryRepo.save(newCatagory);
            return 'Catagory created successfully';
        }
        catch {
            throw new BadRequestException('Catagory failed to create');
        }
    }
    async getAllCatagories() {
        return await this.catagoryRepo.find({
            order: { createdDate: 'DESC' },
        });
    }
    async getCatagoryById(id) {
        const catagory = await this.catagoryRepo.findOne({
            where: { categoryId: id },
        });
        if (catagory != null) {
            return catagory;
        }
        else
            return `Category with id ${id} not found`;
    }
    async replaceCatagory(id, catagory) {
        const res = await this.catagoryRepo.findOne({
            where: { categoryId: id },
        });
        if (res) {
            const res = (await this.catagoryRepo.update(id, catagory)).affected;
            if (res != null && res > 0) {
                return `Catagory with id ${id} is replaced`;
            }
            else {
                return `Catagory with id ${id} failed to be replaced`;
            }
        }
        return `Catagory with id ${id} not found`;
    }
    async updateCatagory(id, catagory) {
        const res = await this.catagoryRepo.findOne({
            where: { categoryId: id },
        });
        if (res) {
            const res = (await this.catagoryRepo.update(id, catagory)).affected;
            if (res != null && res > 0) {
                return `Catagory with id ${id} is updated`;
            }
            else {
                return `Catagory with id ${id} failed to be updated`;
            }
        }
        return `Catagory with id ${id} not found`;
    }
    async deleteCatagoryById(id) {
        const res = (await this.catagoryRepo.delete(id)).affected;
        if (res != null && res > 0) {
            return `Catagory with id ${id} deleted`;
        }
        else {
            return `Catagory with id ${id} not found`;
        }
    }
    async deleteCatagoryByIdSoft(id) {
        const res = (await this.catagoryRepo.softDelete(id)).affected;
        if (res != null && res > 0) {
            return `Catagory with id ${id} deleted`;
        }
        else {
            return `Catagory with id ${id} not found`;
        }
    }
};
ProductCatagoryService = __decorate([
    Injectable(),
    __param(0, InjectRepository(ProductCatagory)),
    __metadata("design:paramtypes", [Repository])
], ProductCatagoryService);
export { ProductCatagoryService };
//# sourceMappingURL=product-category.service.js.map