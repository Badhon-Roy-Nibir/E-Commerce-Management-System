var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray, IsNotEmpty, IsNumber, IsString, IsPositive, ValidateNested, Min, ArrayNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { CreateOrderItemDto } from "../../orderitems/dtos/create-orderitem.dto.js";
export class CreateOrderDto {
    shippingFee;
    discount;
    address;
    orderItems;
    userId;
}
__decorate([
    IsNumber(),
    IsPositive(),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "shippingFee", void 0);
__decorate([
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "discount", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    IsArray(),
    ArrayNotEmpty(),
    ValidateNested({
        each: true
    }),
    Type(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orderItems", void 0);
__decorate([
    IsNotEmpty({
        message: "userId cannot be empty"
    }),
    IsNumber(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "userId", void 0);
//# sourceMappingURL=create-order.dto.js.map