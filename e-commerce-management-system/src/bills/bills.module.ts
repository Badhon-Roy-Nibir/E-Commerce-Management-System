import { Module } from '@nestjs/common';
import { BillsService } from './bills.service.js';
import { BillsController } from './bills.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bills.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Bills])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
