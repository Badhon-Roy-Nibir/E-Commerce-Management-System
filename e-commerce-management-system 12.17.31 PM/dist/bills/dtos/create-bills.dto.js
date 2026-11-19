var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
export class CreateBillsDto {
    paymentMethod;
    transactionId;
    paymentStatus;
    subtotal;
    discount;
    shippingFee;
    tax;
    total;
    paidAt;
    orderId;
}
__decorate([
    IsString({
        message: "paymentMethod must be string",
    }),
    IsNotEmpty({
        message: "paymentMethod cannot be empty"
    }),
    __metadata("design:type", String)
], CreateBillsDto.prototype, "paymentMethod", void 0);
__decorate([
    IsString({
        message: "transactionId must be string",
    }),
    IsNotEmpty({
        message: "transactionId cannot be empty"
    }),
    __metadata("design:type", String)
], CreateBillsDto.prototype, "transactionId", void 0);
__decorate([
    IsString({
        message: "paymentStatus must be string",
    }),
    IsNotEmpty({
        message: "paymentStatus cannot be empty",
    }),
    __metadata("design:type", String)
], CreateBillsDto.prototype, "paymentStatus", void 0);
__decorate([
    Type(() => Number),
    IsNumber(),
    IsNotEmpty({
        message: "SubTotal cannot be empty",
    }),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "subtotal", void 0);
__decorate([
    Type(() => Number),
    IsNotEmpty({
        message: "Dicount mustbe (1-100)%"
    }),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "discount", void 0);
__decorate([
    Type(() => Number),
    IsNotEmpty({
        message: "Shipping fee cannot be empty"
    }),
    IsNumber(),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "shippingFee", void 0);
__decorate([
    IsNotEmpty({
        message: "tax mustbe (1-100)%"
    }),
    IsNumber(),
    Min(0),
    Max(100),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "tax", void 0);
__decorate([
    IsEmpty({
        message: "Total is Automatically calculated."
    }),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "total", void 0);
__decorate([
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CreateBillsDto.prototype, "paidAt", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty({
        message: "OrderId Can't be empty"
    }),
    __metadata("design:type", Number)
], CreateBillsDto.prototype, "orderId", void 0);
//# sourceMappingURL=create-bills.dto.js.map