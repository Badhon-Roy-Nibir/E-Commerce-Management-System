var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional, IsInt, Min, IsDateString, } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePaymentDto {
    amount;
    provider;
    providerReference;
    paidDate;
    billId;
}
__decorate([
    Type(() => Number),
    IsNumber(),
    IsPositive(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "provider", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "providerReference", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Date)
], CreatePaymentDto.prototype, "paidDate", void 0);
__decorate([
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "billId", void 0);
//# sourceMappingURL=create-payment.dto.js.map