import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dtos/register-user.dto.js';
import { LoginUserDto } from './dtos/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("Register-user")
  register(@Body() user: RegisterUserDto){
    return this.authService.registerUser(user);
  }

  @Post("Login-user")
  login(@Body() user: LoginUserDto){
    return this.authService.loginUser(user);
  }


}
