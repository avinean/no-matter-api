import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from 'src/entities/profile.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(context: ProfileEntity) {
    await this.mailerService.sendMail({
      to: context.user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context,
    });
  }
}
