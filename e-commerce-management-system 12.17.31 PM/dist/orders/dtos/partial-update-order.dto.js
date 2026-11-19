var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto.js";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialOrderItemDto } from "../../orderitems/dtos/partial-update-orderitem.dto.js";
export class PartialUpdateOrderdto extends PartialType(OmitType(CreateOrderDto, ['orderItems'])) {
    orderItems;
}
__decorate([
    IsArray(),
    ValidateNested({
        each: true
    }),
    Type(() => PartialOrderItemDto),
    __metadata("design:type", Array)
], PartialUpdateOrderdto.prototype, "orderItems", void 0);
//# sourceMappingURL=partial-update-order.dto.js.map