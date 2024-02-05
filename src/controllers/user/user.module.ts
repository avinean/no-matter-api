import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from 'src/entities/User';
import { ServiceEntity } from 'src/entities/Services';
import { BussinessModule } from '../bussiness/bussiness.module';

@Module({
  imports: [
    BussinessModule,
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, ServiceEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
