import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module.js';

@Module({
  imports: [UsersModule, RolesModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    database: 'e-commerce-management-system',
    username: 'postgres',
    password: "B@dhon",
    synchronize: true,
    autoLoadEntities: true,
  }), AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
