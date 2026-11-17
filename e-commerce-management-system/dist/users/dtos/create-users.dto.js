var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
    name;
    email;
    password;
    isActive;
    roleId;
}
__decorate([
    IsString({
        message: "Name should be string.",
    }),
    IsNotEmpty({
        message: "Name cannot be empty."
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    IsEmail(),
    IsNotEmpty({
        message: "Email cannot be empty."
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    MinLength(8),
    MaxLength(15),
    IsNotEmpty({
        message: "Password cannot be empty.",
    }),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'password should contain one special char, one number, one uppercase and one lowecase letter and minimum 8 char log.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);
__decorate([
    IsNotEmpty({
        message: "Role ID cannot be empty"
    }),
    IsNumber(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "roleId", void 0);
//# sourceMappingURL=create-users.dto.js.map