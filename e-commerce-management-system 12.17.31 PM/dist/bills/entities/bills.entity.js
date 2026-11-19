var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "../../orders/entities/order.entity.js";
import { Payment } from "../../payment/entities/payment.entity.js";
let Bills = class Bills {
    billId;
    paymentMethod;
    transactionId;
    paymentStatus;
    subtotal;
    total;
    discount;
    shippingFee;
    tax;
    issuedAt;
    paidAt;
    orderId;
    order;
    payment;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Bills.prototype, "billId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Bills.prototype, "paymentMethod", void 0);
__decorate([
    Column({
        nullable: true
    }),
    __metadata("design:type", String)
], Bills.prototype, "transactionId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Bills.prototype, "paymentStatus", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Number)
], Bills.prototype, "subtotal", void 0);
__decorate([
    Column({
        nullable: false
    }),
    __metadata("design:type", Number)
], Bills.prototype, "total", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0
    }),
    __metadata("design:type", Number)
], Bills.prototype, "discount", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    }),
    __metadata("design:type", Number)
], Bills.prototype, "shippingFee", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0
    }),
    __metadata("design:type", Number)
], Bills.prototype, "tax", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Bills.prototype, "issuedAt", void 0);
__decorate([
    Column({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Object)
], Bills.prototype, "paidAt", void 0);
__decorate([
    Column({
        unique: true
    }),
    __metadata("design:type", Number)
], Bills.prototype, "orderId", void 0);
__decorate([
    OneToOne(() => Orders, (orders) => orders.bill),
    JoinColumn({
        name: 'orderId'
    }),
    __metadata("design:type", Object)
], Bills.prototype, "order", void 0);
__decorate([
    OneToMany(() => Payment, (payment) => payment.bill),
    __metadata("design:type", Object)
], Bills.prototype, "payment", void 0);
Bills = __decorate([
    Entity("Bills")
], Bills);
export { Bills };
//# sourceMappingURL=bills.entity.js.map