import { Module } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { AddressController } from './address.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { Users } from '../users/entities/users.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Users])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
