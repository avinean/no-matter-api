import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity, ProfileEntity } from 'src/entities/Profile';
import { UserEntity } from 'src/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, ContactEntity, UserEntity]),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
