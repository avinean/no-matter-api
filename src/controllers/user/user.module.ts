import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/controllers/user/user.entity';
import { ProfileEntity } from 'src/controllers/profile/profile.entity';
import { ServiceEntity } from 'src/controllers/service/service.entity';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [
    BusinessModule,
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, ServiceEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
