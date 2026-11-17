var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity.js";
let Address = class Address {
    addressId;
    city;
    country;
    phone;
    line1;
    isDefault;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Address.prototype, "addressId", void 0);
__decorate([
    Column({
        type: "varchar"
    }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    Column({
        type: "varchar"
    }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Address.prototype, "phone", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: true
    }),
    __metadata("design:type", String)
], Address.prototype, "line1", void 0);
__decorate([
    Column({
        type: 'boolean'
    }),
    __metadata("design:type", Boolean)
], Address.prototype, "isDefault", void 0);
__decorate([
    ManyToOne(() => Users, (user) => user.address),
    JoinColumn({
        name: "userId"
    }),
    __metadata("design:type", Object)
], Address.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Address.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Address.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Address.prototype, "deletedAt", void 0);
Address = __decorate([
    Entity("Address")
], Address);
export { Address };
//# sourceMappingURL=address.entity.js.map