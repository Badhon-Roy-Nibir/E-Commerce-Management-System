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
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-users.dto.js';
import { UpdateUsersDto } from './dtos/update-users.dto.js';
import { JwtGuard } from '../auth/jwtGuard.guard.js';
import { RolesGuard } from '../auth/roles/roles/roles.guard.js';
import { Roles } from '../auth/roles/roles/roles.decorator.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(user) {
        return this.usersService.createUser(user);
    }
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    getUsersByID(id) {
        return this.usersService.getUserById(id);
    }
    updateUsers(id, user) {
        return this.usersService.updateUser(id, user);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
    toggleActive(id) {
        return this.usersService.toggleIsActive(id);
    }
};
__decorate([
    Roles("Admin"),
    Post('create-user'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    Roles("Admin", "Manager"),
    Get('Get-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    Roles("Admin", "Manager"),
    Get("Get-users/:id"),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersByID", null);
__decorate([
    Roles("Admin", "Customer", "Manager"),
    Patch("Update-user/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUsers", null);
__decorate([
    Roles("Admin", "Manager"),
    Delete("delete-user/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    Patch("toggleActive/:id"),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "toggleActive", null);
UsersController = __decorate([
    ApiTags('Users'),
    ApiBearerAuth(),
    UseGuards(JwtGuard, RolesGuard),
    Controller('users'),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map