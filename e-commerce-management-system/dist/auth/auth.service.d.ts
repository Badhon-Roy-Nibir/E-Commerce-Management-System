import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto.js';
import { LoginUserDto } from './dtos/login.dto.js';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    registerUser(registerUser: RegisterUserDto): Promise<object>;
    loginUser(login: LoginUserDto): Promise<string>;
}
