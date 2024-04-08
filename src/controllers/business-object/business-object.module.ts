import { Module } from '@nestjs/common';
import { BusinessObjectService } from './business-object.service';
import { BusinessObjectController } from './business-object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessObjectEntity } from 'src/controllers/business-object/business-object.entity';
import { ScheduleModule } from '../schedule/schedule.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  providers: [BusinessObjectService],
  controllers: [BusinessObjectController],
  exports: [BusinessObjectService],
  imports: [
    TypeOrmModule.forFeature([BusinessObjectEntity]),
    ScheduleModule,
    CalendarModule,
    ProfileModule,
  ],
})
export class BusinessObjectsModule {}
