var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
let Products = class Products {
    productId;
    name;
    price;
    stockQuantity;
    createdAt;
    updatedAt;
    deletedAt;
    categoryId;
    orderItems;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Products.prototype, "productId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Products.prototype, "stockQuantity", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Products.prototype, "deletedAt", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Products.prototype, "categoryId", void 0);
__decorate([
    OneToMany(() => OrderItems, (orderItem) => orderItem.product),
    __metadata("design:type", Array)
], Products.prototype, "orderItems", void 0);
Products = __decorate([
    Entity("products")
], Products);
export { Products };
//# sourceMappingURL=products.entity.js.map