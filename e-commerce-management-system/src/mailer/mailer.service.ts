import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly mailerService: NestMailerService){}

    async sendEmail(to: string, subject: string, text: string): Promise<void>{
        await this.mailerService.sendMail({to, subject, text});


    }
    async sendWelcomeEmail(email: string, name: string): Promise<void>{
        await this.mailerService.sendMail({
            to: email,
            subject: "Welcome to E Commerce Management System",

            html: `<h2>Welcome, ${name}!</h2>
                <p>Your account has been successfully created.</p>
                <p>Thank you for joining us.</p>`,
        })

    }
}
