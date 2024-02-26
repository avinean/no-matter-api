import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, UserEntity]),
    ScheduleModule,
  ],
})
export class ProfileModule {}
