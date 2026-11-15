import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity.js';
import { Roles } from '../roles/entities/roles.entity.js';
import { MailerModule } from '../mailer/mailer.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles]), MailerModule],
controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
