import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from 'src/entities/User';
import { ServiceEntity } from 'src/entities/Services';
import { BussinessModule } from '../bussiness/bussiness.module';

@Module({
  imports: [
    BussinessModule,
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, ServiceEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
