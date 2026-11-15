import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service.js';
import { MailerModule as NestMailerModule,} from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [NestMailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>({
      transport: {
        host: configService.get<string>("MAIL_HOST"),
        port: Number(configService.get<string>("MAIL_PORT")),
        secure: false,
        auth: {
          user: configService.get<string>("MAIL_USER"),
          pass: configService.get<string>("MAIL_PASSWORD"),
        },
      },
      defaults: {
        from: configService.get<string>("MAIL_FROM")
      }
    })
  })],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
