var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async registerUser(registerUser) {
        try {
            const createUser = {
                ...registerUser
            };
            return this.usersService.createUser(createUser);
        }
        catch {
            throw new BadRequestException("Registration failed!");
        }
    }
    async loginUser(login) {
        try {
            const user = await this.usersService.getUserByEmail(login.email);
            if (user != null && typeof user != "string") {
                const matchPass = await bcrypt.compare(login.password, user.password);
                if (matchPass) {
                    const payloads = {
                        id: user.userId,
                        email: user.email,
                        role: user.role.name,
                    };
                    const access_token = this.jwtService.sign(payloads);
                    return access_token;
                }
                else {
                    return `PassWord not matched!`;
                }
            }
            else {
                return `User with email ${login.email} not found`;
            }
        }
        catch (error) {
            console.log(error);
            throw new BadRequestException("Login failed!");
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map