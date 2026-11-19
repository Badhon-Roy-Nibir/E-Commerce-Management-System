var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity.js';
import { CartController } from '../cart/cart.controller.js';
import { CartService } from '../cart/cart.service.js';
let CartModule = class CartModule {
};
CartModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Cart])],
        controllers: [CartController],
        providers: [CartService],
        exports: [CartService],
    })
], CartModule);
export { CartModule };
//# sourceMappingURL=cart.module.js.map