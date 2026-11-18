import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BillsModule } from './bills/bills.module.js';
import { MailerModule } from './mailer/mailer.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrderitemsModule } from './orderitems/orderitems.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { CartModule } from './cart/cart.module.js';
import { CartitemsModule } from './cartitems/cartitems.module.js';
import { PaymentModule } from './payment/payment.module.js';
import { ProductCatagoryModule } from './product-category/product-category.module.js';

@Module({
  imports: [UsersModule, RolesModule,
    ConfigModule.forRoot({
      isGlobal: true,

    }), TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
        type: "postgres" as const,
        host: config.get<string>("DB_HOST"),
        port: Number(config.get<string>("DB_PORT")),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        database: config.get<string>("DB_DATABASE"),
        synchronize: true,
        autoLoadEntities: true,
      })
      
  }), AddressModule, AuthModule, BillsModule, MailerModule, ProductsModule, OrderitemsModule, OrdersModule, CartModule, CartitemsModule, PaymentModule, ProductCatagoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}