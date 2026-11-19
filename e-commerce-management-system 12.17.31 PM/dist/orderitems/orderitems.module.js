var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service.js';
import { OrderitemsController } from './orderitems.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from './entities/orderitems.entity.js';
import { Products } from '../products/entities/products.entity.js';
import { Orders } from '../orders/entities/order.entity.js';
let OrderitemsModule = class OrderitemsModule {
};
OrderitemsModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([OrderItems, Products, Orders])],
        controllers: [OrderitemsController],
        providers: [OrderitemsService],
    })
], OrderitemsModule);
export { OrderitemsModule };
//# sourceMappingURL=orderitems.module.js.map