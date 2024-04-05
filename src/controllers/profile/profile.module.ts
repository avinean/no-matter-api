import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/controllers/profile/profile.entity';
import { UserEntity } from 'src/controllers/user/user.entity';
import { ScheduleModule } from '../schedule/schedule.module';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, UserEntity]),
    ScheduleModule,
    CalendarModule,
  ],
})
export class ProfileModule {}
