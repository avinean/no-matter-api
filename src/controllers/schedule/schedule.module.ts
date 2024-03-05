import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entities/schedule.entity';

@Module({
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  exports: [ScheduleService],
})
export class ScheduleModule {}
