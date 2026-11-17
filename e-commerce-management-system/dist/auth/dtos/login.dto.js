var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class LoginUserDto {
    email;
    password;
}
__decorate([
    IsNotEmpty({
        message: "email cannot be Empty!"
    }),
    IsEmail(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    IsNotEmpty({
        message: "Please give the password"
    }),
    IsString({
        message: "PassWord must be string"
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=login.dto.js.map