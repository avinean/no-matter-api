import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entities/schedule.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async set(schedule: DeepPartial<ScheduleEntity>[]) {
    const entitiesToSave = schedule.map((s) =>
      this.scheduleRepository.create(s),
    );

    await this.scheduleRepository.upsert(entitiesToSave, {
      conflictPaths: ['id'],
    });

    return entitiesToSave;
  }
}
