import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ProfileService } from './profile.service';
import { SkipPermission } from 'src/decorators/permission.decorator';
import { CreateProfileDto } from './profile.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleEntity } from 'src/controllers/schedule/schedule.entity';
import { CalendarEntity } from 'src/controllers/calendar/calendar.entity';
import { CalendarService } from '../calendar/calendar.service';
import { DeepPartial } from 'typeorm';
import { ProfileEntity } from 'src/controllers/profile/profile.entity';

@ApiTags('Profile')
@SetMetadata('resource', Resource.profile)
@Controller(Resource.profile)
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private scheduleService: ScheduleService,
    private calendarService: CalendarService,
  ) {}

  @SkipPermission()
  @Get('me')
  findMe(@Req() req) {
    return this.profileService.findMe(req.user.sub);
  }

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.profileService.findAll({
      where: { employers: { id: businessObjectId } },
      relations: {
        services: true,
        roles: true,
      },
    });
  }

  @Post(':businessObjectId')
  create(
    @Body() dto: CreateProfileDto,
    @Param('businessObjectId') businessObjectId: number,
  ) {
    return this.profileService.create({
      ...dto,
      employers: [{ id: businessObjectId }],
    });
  }

  @Put(':businessObjectId/:id')
  update(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Body() dto: DeepPartial<ProfileEntity>,
    @Req() req,
  ) {
    return this.profileService.update(
      [
        { id, employers: [{ id: businessObjectId }] },
        { id, user: { id: req.user.sub } },
      ],
      dto,
    );
  }

  @SkipPermission()
  @Put(':businessObjectId/:id/primary')
  async primary(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Req() req,
  ) {
    return this.profileService.primary([
      { id, employers: [{ id: businessObjectId }] },
      { id, user: { id: req.user.sub } },
    ]);
  }

  @Put(':businessObjectId/:id/schedule')
  setSchedule(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Body() schedule: ScheduleEntity[],
  ) {
    return this.scheduleService.set(
      schedule.map((s) => ({ ...s, profile: { id } })),
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

  @Put(':businessObjectId/:id/lang/:lang')
  setLang(
    @Param('id') id: number,
    @Param('businessObjectId') businessObjectId: number,
    @Param('lang') language: string,
    @Req() req,
  ) {
    return this.profileService.update(
      [
        { id, employers: [{ id: businessObjectId }] },
        { id, user: { id: req.user.sub } },
      ],
      { language },
    );
  }
}
