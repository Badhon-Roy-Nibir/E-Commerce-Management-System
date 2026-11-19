var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class CreateAddressDto {
    city;
    country;
    phone;
    line1;
    isDefault;
    userId;
}
__decorate([
    IsString({
        message: "City must be string"
    }),
    IsNotEmpty({
        message: "City cannot be empty",
    }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    IsString({
        message: "Country must be string"
    }),
    IsNotEmpty({
        message: "Country cannot be empty",
    }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "country", void 0);
__decorate([
    IsNotEmpty({
        message: "Phone number cannot be empty",
    }),
    MinLength(11, {
        message: "phone number should be 11 digits"
    }),
    MaxLength(11),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "phone", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "line1", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateAddressDto.prototype, "isDefault", void 0);
__decorate([
    IsNotEmpty(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateAddressDto.prototype, "userId", void 0);
//# sourceMappingURL=create-address.dto.js.map