import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto.js';
import { Users } from '../users/entities/users.entity.js';
import { CreateUserDto } from '../users/dtos/create-users.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login.dto.js';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async registerUser(registerUser: RegisterUserDto): Promise<object>{
        try{
            const createUser: CreateUserDto = {
                ...registerUser
            }
            return this.usersService.createUser(createUser);
        }catch{
            throw new BadRequestException("Registration failed!");
        }

    }
    async loginUser(login: LoginUserDto): Promise<string>{
        try{
            const user = await this.usersService.getUserByEmail(login.email);
            if(user != null && typeof user != "string"){
                const matchPass = await bcrypt.compare(login.password, user.password);
                if(matchPass){
                    const payloads = {
                        id: user.userId,
                        email: user.email,
                        role: user.role.name,
                    }
                    const access_token = this.jwtService.sign(payloads);
                    return access_token;
                }else{
                    return `PassWord not matched!`
                }
            }else{
                return `User with email ${login.email} not found`;
            }

        }catch(error){
            console.log(error)
            throw new BadRequestException("Login failed!");
        }

    }

}
