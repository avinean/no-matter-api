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

  @Get(':profileId/:businessId')
  async findAll(
    @Param('profileId') profileId: number,
    @Param('businessId') businessId: number,
  ) {
    return await this.objectService.findAll(profileId, businessId);
  }

  @Post(':profileId/:businessId')
  create(
    @Body() body: CreateBusinessObjectDto,
    @Param('profileId') profileId: number,
    @Param('businessId') businessId: number,
  ) {
    return this.objectService.create(body, profileId, businessId);
  }

  @Put(':profileId/:businessId/:businessObjectId')
  update(
    @Body() body: CreateBusinessObjectDto,
    @Param('businessObjectId') businessObjectId: number,
  ) {
    return this.objectService.update(body, businessObjectId);
  }

  @Put(':businessObjectId/schedule')
  setSchedule(
    @Param('businessObjectId') id: number,
    @Body() schedule: ScheduleEntity[],
  ) {
    return this.scheduleService.set(
      schedule.map((s) => ({ ...s, businessObject: { id } })),
    );
  }

  @Put(':businessObjectId/:id/calendar')
  setCalendar(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Body() calendar: CalendarEntity,
  ) {
    return this.calendarService.set(calendar);
  }
}
