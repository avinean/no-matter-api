import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/controllers/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BussinessModule } from '../bussiness/bussiness.module';
import { BussinessObjectsModule } from '../bussiness-object/bussiness-object.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';

@Module({
  imports: [
    UserModule,
    BussinessModule,
    BussinessObjectsModule,
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
