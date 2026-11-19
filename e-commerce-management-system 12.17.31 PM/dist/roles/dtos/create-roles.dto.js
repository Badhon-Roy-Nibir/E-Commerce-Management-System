var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateRolesDto {
    name;
    description;
}
__decorate([
    IsNotEmpty({
        message: "Name cannot be empty."
    }),
    IsString({
        message: "Name should be string."
    }),
    MaxLength(20, {
        message: "Guest length must be within 20 charecters."
    }),
    __metadata("design:type", String)
], CreateRolesDto.prototype, "name", void 0);
__decorate([
    IsNotEmpty({
        message: "Description cannot be empty."
    }),
    IsString({
        message: "Description should be string."
    }),
    __metadata("design:type", String)
], CreateRolesDto.prototype, "description", void 0);
//# sourceMappingURL=create-roles.dto.js.map