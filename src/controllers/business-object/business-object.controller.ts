import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { BusinessObjectService } from './business-object.service';
import { CreateBusinessObjectDto } from './business-object.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ScheduleEntity } from 'src/controllers/schedule/schedule.entity';
import { ScheduleService } from '../schedule/schedule.service';
import { CalendarEntity } from 'src/controllers/calendar/calendar.entity';
import { CalendarService } from '../calendar/calendar.service';

@ApiTags('Business Object')
@SetMetadata('resource', Resource.businessObject)
@Controller(Resource.businessObject)
export class BusinessObjectController {
  constructor(
    private readonly objectService: BusinessObjectService,
    private readonly scheduleService: ScheduleService,
    private readonly calendarService: CalendarService,
  ) {}

  @Post(':id')
  create(@Body() body: CreateBusinessObjectDto, @Param('id') id: number) {
    return this.objectService.create(body, id);
  }

  @Put(':id')
  update(@Body() body: CreateBusinessObjectDto, @Param('id') id: number) {
    return this.objectService.update(id, body);
  }

  @Put(':id/schedule')
  setSchedule(@Param('id') id: number, @Body() schedule: ScheduleEntity[]) {
    return this.scheduleService.set(
      schedule.map((s) => ({ ...s, businessObject: { id } })),
    );
  }

  @Put(':id/calendar')
  setCalendar(@Param('id') id: number, @Body() calendar: CalendarEntity) {
    return this.calendarService.set(calendar);
  }
}
