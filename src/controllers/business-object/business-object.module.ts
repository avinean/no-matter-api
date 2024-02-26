import { Module } from '@nestjs/common';
import { BusinessObjectService } from './business-object.service';
import { BusinessObjectController } from './business-object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessObjectEntity } from 'src/entities/business-object.entity';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  providers: [BusinessObjectService],
  controllers: [BusinessObjectController],
  exports: [BusinessObjectService],
  imports: [TypeOrmModule.forFeature([BusinessObjectEntity]), ScheduleModule],
})
export class BusinessObjectsModule {}
