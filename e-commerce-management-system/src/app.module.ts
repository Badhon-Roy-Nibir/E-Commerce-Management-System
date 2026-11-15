import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderitemsModule } from './orderitems/orderitems.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';


@Module({
  imports: [ProductsModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type:"postgres" as const,
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: (config.get<string>('DB_USERNAME')),
        password: (config.get<string>('DB_PASSWORD')),
        database: (config.get<string>('DB_DATABASE')),
        autoLoadEntities:true,
        synchronize:true,
      })          
    }),
    OrderitemsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
