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
import { Users } from "../../users/entities/users.entity.js";
let Roles = class Roles {
    roleId;
    name;
    description;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Roles.prototype, "roleId", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 20,
        unique: true,
    }),
    __metadata("design:type", String)
], Roles.prototype, "name", void 0);
__decorate([
    Column({
        type: "varchar",
    }),
    __metadata("design:type", String)
], Roles.prototype, "description", void 0);
__decorate([
    OneToMany(() => Users, (user) => user.role),
    __metadata("design:type", Object)
], Roles.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Roles.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Roles.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Roles.prototype, "deletedAt", void 0);
Roles = __decorate([
    Entity("Roles")
], Roles);
export { Roles };
//# sourceMappingURL=roles.entity.js.map