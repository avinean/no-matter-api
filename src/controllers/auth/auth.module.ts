import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/controllers/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BussinessModule } from '../bussiness/bussiness.module';
import { BussinessObjectsModule } from '../bussiness-object/bussiness-object.module';

@Module({
  imports: [
    UsersModule,
    BussinessModule,
    BussinessObjectsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '6000000000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
