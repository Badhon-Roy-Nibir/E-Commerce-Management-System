var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { Bills } from '../../bills/entities/bills.entity.js';
let Payment = class Payment {
    paymentId;
    amount;
    provider;
    providerReference;
    paidDate;
    bill;
    createdDate;
    updatedDate;
    deletedDate;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Payment.prototype, "paymentId", void 0);
__decorate([
    Column({ type: 'decimal',
        precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    Column({ length: 50 }),
    __metadata("design:type", String)
], Payment.prototype, "provider", void 0);
__decorate([
    Column({
        unique: true,
        nullable: true
    }),
    __metadata("design:type", String)
], Payment.prototype, "providerReference", void 0);
__decorate([
    Column({
        type: 'timestamp',
        nullable: true
    }),
    __metadata("design:type", Date)
], Payment.prototype, "paidDate", void 0);
__decorate([
    ManyToOne(() => Bills, (bill) => bill.payment, {
        nullable: false,
        onDelete: 'CASCADE'
    }),
    JoinColumn({
        name: 'billId'
    }),
    __metadata("design:type", Object)
], Payment.prototype, "bill", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Payment.prototype, "createdDate", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Payment.prototype, "updatedDate", void 0);
__decorate([
    DeleteDateColumn({
        nullable: true
    }),
    __metadata("design:type", Date)
], Payment.prototype, "deletedDate", void 0);
Payment = __decorate([
    Entity('payments')
], Payment);
export { Payment };
//# sourceMappingURL=payment.entity.js.map