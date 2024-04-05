import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEntity } from 'src/controllers/calendar/calendar.entity';

@Module({
  providers: [CalendarService],
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  exports: [CalendarService],
})
export class CalendarModule {}
