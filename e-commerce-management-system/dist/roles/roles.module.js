var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { RolesController } from './roles.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity.js';
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Roles])],
        controllers: [RolesController],
        providers: [RolesService],
    })
], RolesModule);
export { RolesModule };
//# sourceMappingURL=roles.module.js.map