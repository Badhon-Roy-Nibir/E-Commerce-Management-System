import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailerService {
    private readonly mailerService;
    constructor(mailerService: NestMailerService);
    sendEmail(to: string, subject: string, text: string): Promise<void>;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
}
