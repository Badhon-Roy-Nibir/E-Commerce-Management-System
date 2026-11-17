var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service.js';
import { MailerModule as NestMailerModule, } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
let MailerModule = class MailerModule {
};
MailerModule = __decorate([
    Module({
        imports: [NestMailerModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get("MAIL_HOST"),
                        port: Number(configService.get("MAIL_PORT")),
                        secure: false,
                        auth: {
                            user: configService.get("MAIL_USER"),
                            pass: configService.get("MAIL_PASSWORD"),
                        },
                    },
                    defaults: {
                        from: configService.get("MAIL_FROM")
                    }
                })
            })],
        providers: [MailerService],
        exports: [MailerService]
    })
], MailerModule);
export { MailerModule };
//# sourceMappingURL=mailer.module.js.map