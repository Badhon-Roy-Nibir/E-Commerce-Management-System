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
import { Users } from './entities/users.entity.js';
import { Roles } from '../roles/entities/roles.entity.js';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/mailer.service.js';
let UsersService = class UsersService {
    userRepo;
    roleRepo;
    mailerService;
    constructor(userRepo, roleRepo, mailerService) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.mailerService = mailerService;
    }
    async createUser(user) {
        try {
            const role = await this.roleRepo.findOne({
                where: {
                    roleId: user.roleId,
                }
            });
            if (!role) {
                return {
                    message: "Role doesnot exist"
                };
            }
            const email = await this.userRepo.findOne({
                where: {
                    email: user.email
                }
            });
            if (email) {
                return {
                    message: `${user.email} already exisits with anothwer user`
                };
            }
            const hasPass = await bcrypt.hash(user.password, 10);
            user.password = hasPass;
            const newUser = await this.userRepo.create({
                name: user.name,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                role: role
            });
            if (newUser) {
                await this.userRepo.save(newUser);
                const emailUser = {
                    name: newUser.name,
                    email: newUser.email,
                };
                await this.mailerService.sendWelcomeEmail(emailUser.email, emailUser.name);
                return {
                    message: "New User Created!",
                    data: newUser
                };
            }
            else {
                return {
                    message: "User not created!"
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new BadRequestException("No User found!");
        }
    }
    async getAllUsers() {
        try {
            const user = await this.userRepo.find({
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    isActive: true,
                    role: {
                        name: true
                    },
                    address: {
                        city: true,
                        country: true,
                        line1: true,
                        phone: true,
                        isDefault: true
                    }
                },
                relations: {
                    role: true,
                    address: true
                }
            });
            if (user) {
                return {
                    message: 'All Users',
                    data: user.map(user => ({
                        userId: user.userId,
                        name: user.name,
                        iaActive: user.isActive,
                        roleName: user.role?.name,
                        address: user.address,
                    }))
                };
            }
            else {
                return {
                    message: "No users found!"
                };
            }
        }
        catch {
            throw new BadRequestException("No users!");
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userId: id
                },
                relations: {
                    role: true,
                    address: true
                }
            });
            if (user) {
                return user;
            }
            else {
                return `User with id ${id} not found!`;
            }
        }
        catch {
            throw new BadRequestException("User not found!");
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    email: email
                },
                relations: {
                    role: true,
                    address: true
                }
            });
            if (user) {
                return user;
            }
            else {
                return `User with id ${email} not found!`;
            }
        }
        catch {
            throw new BadRequestException("User not found!");
        }
    }
    async updateUser(id, user) {
        try {
            const updatedUser = await this.userRepo.findOne({
                where: {
                    userId: id,
                }
            });
            if (updatedUser) {
                const res = (await this.userRepo.update(id, user)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `user with id ${id} updated`
                    };
                }
                else {
                    return {
                        message: `user with id ${id} not updated`
                    };
                }
            }
            else {
                return {
                    message: `user with id ${id} not found`
                };
            }
        }
        catch {
            throw new BadRequestException("No users!");
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userId: id
                }
            });
            if (user) {
                const res = (await this.userRepo.softDelete(id)).affected;
                if (res != null && res > 0) {
                    return {
                        message: `User with id ${id} deleted`
                    };
                }
                else {
                    return {
                        message: `User with id ${id} not deleted`
                    };
                }
            }
            else {
                return {
                    message: `User with id ${id} not found`
                };
            }
        }
        catch {
            throw new BadRequestException("UserNot Found");
        }
    }
    async toggleIsActive(id) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userId: id
                },
                select: {
                    userId: true,
                    name: true,
                    isActive: true
                }
            });
            if (user) {
                user.isActive = !user.isActive;
                const updateUser = (await this.userRepo.update(id, user)).affected;
                if (updateUser != null && updateUser > 0) {
                    return {
                        message: `User with id ${id} toggled!`,
                        data: user
                    };
                }
                else {
                    return {
                        message: `User with id ${id} not toggled!`,
                    };
                }
            }
            else {
                return {
                    message: `User with id ${id} not found!`,
                };
            }
        }
        catch {
            throw new BadRequestException("User not found!");
        }
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Users)),
    __param(1, InjectRepository(Roles)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        MailerService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map