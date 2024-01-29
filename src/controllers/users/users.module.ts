import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UserEntity, UserProfileEntity } from 'src/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserProfileEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
