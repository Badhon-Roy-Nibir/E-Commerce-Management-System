var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "../../orderitems/entities/orderitems.entity.js";
import { Users } from "../../users/entities/users.entity.js";
import { Bills } from "../../bills/entities/bills.entity.js";
let Orders = class Orders {
    orderId;
    status;
    shippingFee;
    discount;
    subTotal;
    Total;
    address;
    orderItems;
    users;
    bill;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Orders.prototype, "orderId", void 0);
__decorate([
    Column({
        default: "PENDING",
    }),
    __metadata("design:type", String)
], Orders.prototype, "status", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Orders.prototype, "shippingFee", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    }),
    __metadata("design:type", Number)
], Orders.prototype, "discount", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Number)
], Orders.prototype, "subTotal", void 0);
__decorate([
    Column({
        type: "decimal",
        precision: 10,
        scale: 2
    }),
    __metadata("design:type", Number)
], Orders.prototype, "Total", void 0);
__decorate([
    Column({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], Orders.prototype, "address", void 0);
__decorate([
    OneToMany(() => OrderItems, (orderItem) => orderItem.order),
    __metadata("design:type", Object)
], Orders.prototype, "orderItems", void 0);
__decorate([
    ManyToOne(() => Users, (users) => users.orders),
    JoinColumn({
        name: 'userId'
    }),
    __metadata("design:type", Object)
], Orders.prototype, "users", void 0);
__decorate([
    OneToOne(() => Bills, (bill) => bill.order),
    __metadata("design:type", Object)
], Orders.prototype, "bill", void 0);
Orders = __decorate([
    Entity("Order")
], Orders);
export { Orders };
//# sourceMappingURL=order.entity.js.map