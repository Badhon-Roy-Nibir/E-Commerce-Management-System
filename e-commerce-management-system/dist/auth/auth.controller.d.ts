import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dtos/register-user.dto.js';
import { LoginUserDto } from './dtos/login.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: RegisterUserDto): Promise<object>;
    login(user: LoginUserDto): Promise<string>;
}
