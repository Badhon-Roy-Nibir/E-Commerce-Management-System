var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { CreateRolesDto } from './dtos/create-roles.dto.js';
import { UpdateRolesDto } from './dtos/update-roles.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    createRoles(roles) {
        return this.rolesService.createRoles(roles);
    }
    getAllRoles() {
        return this.rolesService.getAllRoles();
    }
    getRolesById(id) {
        return this.rolesService.getRolesById(id);
    }
    updateRole(id, role) {
        return this.rolesService.updateRoles(id, role);
    }
    deleteRole(id) {
        return this.rolesService.deleteRole(id);
    }
};
__decorate([
    Post("Create-Roles"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRolesDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createRoles", null);
__decorate([
    Get("Get-Roles"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAllRoles", null);
__decorate([
    Get("Get-Roles/:id"),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRolesById", null);
__decorate([
    Patch("Update-Role/:id"),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateRolesDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updateRole", null);
__decorate([
    Delete("Delete-Role/:id"),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "deleteRole", null);
RolesController = __decorate([
    ApiTags('roles'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Roles("Admin"),
    Controller('roles'),
    __metadata("design:paramtypes", [RolesService])
], RolesController);
export { RolesController };
//# sourceMappingURL=roles.controller.js.map