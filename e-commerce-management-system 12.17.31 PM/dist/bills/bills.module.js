var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { BillsService } from './bills.service.js';
import { BillsController } from './bills.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bills.entity.js';
let BillsModule = class BillsModule {
};
BillsModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Bills])],
        controllers: [BillsController],
        providers: [BillsService],
    })
], BillsModule);
export { BillsModule };
//# sourceMappingURL=bills.module.js.map