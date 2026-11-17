var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity.js';
import { Address } from '../../address/entities/address.entity.js';
let Users = class Users {
    userId;
    name;
    email;
    password;
    isActive;
    role;
    address;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "userId", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: false,
        length: 30,
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    Column({
        type: "boolean"
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    ManyToOne(() => Roles, (role) => role.user, {
        nullable: false,
        onDelete: 'CASCADE'
    }),
    JoinColumn({ name: "roleId" }),
    __metadata("design:type", Object)
], Users.prototype, "role", void 0);
__decorate([
    OneToMany(() => Address, (address) => address.user),
    __metadata("design:type", Array)
], Users.prototype, "address", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Users.prototype, "deletedAt", void 0);
Users = __decorate([
    Entity("Users")
], Users);
export { Users };
//# sourceMappingURL=users.entity.js.map