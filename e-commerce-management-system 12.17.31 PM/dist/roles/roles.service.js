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
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity.js';
let RolesService = class RolesService {
    rolesRepo;
    constructor(rolesRepo) {
        this.rolesRepo = rolesRepo;
    }
    async createRoles(roles) {
        try {
            const check = await this.rolesRepo.findOne({
                where: {
                    name: roles.name
                }
            });
            if (check) {
                return {
                    message: `Role with name: ${check.name} already exists`
                };
            }
            const newRole = await this.rolesRepo.create(roles);
            await this.rolesRepo.save(newRole);
            return {
                message: "Role Created!",
                data: newRole,
            };
        }
        catch {
            throw new BadRequestException("Role is not Created");
        }
    }
    async getAllRoles() {
        try {
            const roles = await this.rolesRepo.find({
                select: {
                    roleId: true,
                    name: true,
                    description: true,
                }
            });
            return {
                message: "All Roles!",
                data: roles,
            };
        }
        catch {
            throw new BadRequestException("Roles are not found!");
        }
    }
    async getRolesById(id) {
        try {
            const roles = await this.rolesRepo.findOne({
                where: {
                    roleId: id,
                }
            });
            if (roles) {
                return {
                    message: `Role with id ${id}: `,
                    data: roles,
                };
            }
            else {
                return {
                    message: `Role with id ${id} not found!`,
                };
            }
        }
        catch {
            throw new BadRequestException("Role not found!");
        }
    }
    async updateRoles(id, role) {
        try {
            const updateRole = await this.rolesRepo.findOne({
                where: { roleId: id }
            });
            if (updateRole) {
                const res = (await this.rolesRepo.update(id, role)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `Role with id ${id} is updated!`
                    };
                }
                else {
                    return {
                        message: `Role with id ${id} is not updated!`
                    };
                }
            }
            else {
                return {
                    message: `Role with id ${id} not found!`
                };
            }
        }
        catch {
            throw new BadRequestException('Roles not found');
        }
    }
    async deleteRole(id) {
        try {
            const role = await this.rolesRepo.findOne({
                where: { roleId: id }
            });
            if (role) {
                const res = (await this.rolesRepo.delete(id)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `Role with id ${id} deleted!`
                    };
                }
                else {
                    return {
                        message: `Role with id ${id} deleted!`
                    };
                }
            }
            else {
                return {
                    message: `Role with id ${id} not found!`
                };
            }
        }
        catch {
            throw new BadRequestException('Roles not found');
        }
    }
};
RolesService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Roles)),
    __metadata("design:paramtypes", [Repository])
], RolesService);
export { RolesService };
//# sourceMappingURL=roles.service.js.map