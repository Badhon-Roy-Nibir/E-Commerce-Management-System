import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductCatagoryModule } from './product-catagory/product-catagory.module.js';
import { PaymentModule } from './payment/payment.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'E_Commerce_Management_db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProductCatagoryModule,
    PaymentModule,
  ],
})
export class AppModule {}