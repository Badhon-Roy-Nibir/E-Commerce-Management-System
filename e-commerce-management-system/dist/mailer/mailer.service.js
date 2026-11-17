var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
let MailerService = class MailerService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmail(to, subject, text) {
        await this.mailerService.sendMail({ to, subject, text });
    }
    async sendWelcomeEmail(email, name) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Welcome to E Commerce Management System",
            html: `<h2>Welcome, ${name}!</h2>
                <p>Your account has been successfully created.</p>
                <p>Thank you for joining us.</p>`,
        });
    }
};
MailerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NestMailerService])
], MailerService);
export { MailerService };
//# sourceMappingURL=mailer.service.js.map