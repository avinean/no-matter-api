import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entities/schedule.entity';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  exports: [ScheduleService],
})
export class ScheduleModule {}
