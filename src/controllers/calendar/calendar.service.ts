import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEntity } from 'src/entities/calendar.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  set(calendar: DeepPartial<CalendarEntity>) {
    return this.calendarRepository.upsert(calendar, {
      conflictPaths: ['id'],
    });
  }
}
