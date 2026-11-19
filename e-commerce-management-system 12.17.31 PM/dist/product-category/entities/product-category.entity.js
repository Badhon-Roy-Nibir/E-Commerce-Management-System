var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, } from 'typeorm';
import { Products } from '../../products/entities/products.entity.js';
let ProductCatagory = class ProductCatagory {
    categoryId;
    name;
    description;
    isActive;
    product;
    createdDate;
    updatedDate;
    deletedDate;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductCatagory.prototype, "categoryId", void 0);
__decorate([
    Column({
        type: 'varchar',
        unique: true,
        length: 100,
    }),
    __metadata("design:type", String)
], ProductCatagory.prototype, "name", void 0);
__decorate([
    Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductCatagory.prototype, "description", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], ProductCatagory.prototype, "isActive", void 0);
__decorate([
    OneToMany(() => Products, (products) => products.productCategory),
    __metadata("design:type", Object)
], ProductCatagory.prototype, "product", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], ProductCatagory.prototype, "createdDate", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], ProductCatagory.prototype, "updatedDate", void 0);
__decorate([
    DeleteDateColumn({
        nullable: true,
    }),
    __metadata("design:type", Date)
], ProductCatagory.prototype, "deletedDate", void 0);
ProductCatagory = __decorate([
    Entity('product_categories')
], ProductCatagory);
export { ProductCatagory };
//# sourceMappingURL=product-category.entity.js.map