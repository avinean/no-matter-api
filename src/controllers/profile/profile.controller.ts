import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

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
  findMe(@User() user: UserMeta) {
    return this.profileService.findMe(user.sub);
  }

  @Get()
  findAll(@User() user: UserMeta) {
    return this.profileService.findAll({
      where: { businesses: [{ id: user.bisid }] },
      relations: {
        services: true,
        roles: true,
        primaryBusiness: true,
        primaryBusinessObject: true,
      },
    });
  }

  @Post()
  create(@Body() dto: CreateProfileDto, @User() user: UserMeta) {
    return this.profileService.create({
      ...dto,
      businesses: [{ id: user.bisid }],
      primaryBusiness: { id: user.bisid },
      primaryBusinessObject: { id: user.objid },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() dto: DeepPartial<ProfileEntity>,
    @User() user: UserMeta,
  ) {
    return this.profileService.update(
      {
        id,
        user: { id: user.sub },
        businesses: [{ id: user.bisid }],
      },
      dto,
    );
  }

  @SkipPermission()
  @Put(':id/primary')
  async primary(@Param('id') id: number, @User() user: UserMeta) {
    return this.profileService.primary([
      { id, businesses: [{ id: user.bisid }] },
      { id, user: { id: user.sub } },
    ]);
  }

  @Put(':id/schedule')
  setSchedule(@Param('id') id: number, @Body() schedule: ScheduleEntity[]) {
    return this.scheduleService.set(
      schedule.map((s) => ({ ...s, profile: { id } })),
    );
  }

  @Put(':id/calendar')
  setCalendar(@Param('id') id: number, @Body() calendar: CalendarEntity) {
    return this.calendarService.set(calendar);
  }

  @Put(':id/lang/:lang')
  setLang(
    @Param('id') id: number,
    @Param('lang') language: string,
    @User() user: UserMeta,
  ) {
    return this.profileService.update(
      [
        { id, businesses: [{ id: user.bisid }] },
        { id, user: { id: user.sub } },
      ],
      { language },
    );
  }
}
