import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { BussinessModule } from '../bussiness/bussiness.module';

@Module({
  imports: [
    BussinessModule,
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, ServiceEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
