import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderitemsModule } from './orderitems/orderitems.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'sweety00',
      database:'e-commerce-management-system',
      autoLoadEntities:true,
      synchronize:true,
    }),
    OrderitemsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
