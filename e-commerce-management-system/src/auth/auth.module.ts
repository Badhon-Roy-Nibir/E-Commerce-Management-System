import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy.strategy.js';
import { JwtGuard } from './jwtGuard.guard.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService)=>({
      global: true,
      secret: config.getOrThrow<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: config.get<SignOptions["expiresIn"]>("JWT_EXPIRES_IN", '1h')
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard],
})
export class AuthModule {}
