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
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleEntity } from 'src/entities/schedule.entity';
import { CalendarEntity } from 'src/entities/calendar.entity';
import { CalendarService } from '../calendar/calendar.service';

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
    @Body() userDTO: UpdateProfileDto,
    @Req() req,
  ) {
    return this.profileService.update(
      [
        { id, employers: [{ id: businessObjectId }] },
        { id, user: { id: req.user.sub } },
      ],
      userDTO,
    );
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
