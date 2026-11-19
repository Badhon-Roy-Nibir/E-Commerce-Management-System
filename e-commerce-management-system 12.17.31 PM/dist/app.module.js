var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BillsModule } from './bills/bills.module.js';
import { MailerModule } from './mailer/mailer.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrderitemsModule } from './orderitems/orderitems.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { CartModule } from './cart/cart.module.js';
import { CartitemsModule } from './cartitems/cartitems.module.js';
import { PaymentModule } from './payment/payment.module.js';
import { ProductCatagoryModule } from './product-category/product-category.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [UsersModule, RolesModule,
            ConfigModule.forRoot({
                isGlobal: true,
            }), TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    type: "postgres",
                    host: config.get("DB_HOST"),
                    port: Number(config.get("DB_PORT")),
                    username: config.get("DB_USERNAME"),
                    password: config.get("DB_PASSWORD"),
                    database: config.get("DB_DATABASE"),
                    synchronize: true,
                    autoLoadEntities: true,
                })
            }), AddressModule, AuthModule, BillsModule, MailerModule, ProductsModule, OrderitemsModule, OrdersModule, CartModule, CartitemsModule, PaymentModule, ProductCatagoryModule],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map