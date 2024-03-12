import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BusinessModule } from '../business/business.module';
import { BusinessObjectsModule } from '../business-object/business-object.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { ProfileModule } from '../profile/profile.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    ProfileModule,
    BusinessModule,
    BusinessObjectsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '6000000000000s' },
    }),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
