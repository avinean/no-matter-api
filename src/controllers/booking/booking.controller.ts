import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  SearchProfilesDto,
  SearchServicesDto,
  SearchTimeslotsDto,
} from './booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { BookingEntity } from 'src/controllers/booking/booking.entity';
import { ProfileService } from '../profile/profile.service';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('Booking')
@SetMetadata('resource', Resource.booking)
@Controller(Resource.booking)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  findAll(@User() user: UserMeta) {
    return this.bookingService.findAll({
      businessObject: { id: user.objid },
    });
  }

  @Post()
  async create(@Body() dto: BookingEntity, @User() user: UserMeta) {
    const profile = await this.profileService.findOne({
      where: { user: { id: user.sub } },
    });

    return this.bookingService.create(
      {
        ...dto,
        businessObject: {
          id: user.objid,
        },
      },
      profile,
    );
  }

  @Put(':id')
  async update(
    @Body() dto: BookingEntity,
    @Param('id') id: number,
    @User() user: UserMeta,
  ) {
    const profile = await this.profileService.findOne({
      where: { user: { id: user.sub } },
    });

    return this.bookingService.update(
      {
        id,
      },
      {
        ...dto,
        businessObject: {
          id: user.objid,
        },
      },
      profile,
    );
  }

  @Put(':id/confirm')
  async confirm(@Param('id') id: number, @User() user: UserMeta) {
    const profile = await this.profileService.findOne({
      where: { user: { id: user.sub } },
    });

    return this.bookingService.confirm(id, profile);
  }

  @Put(':id/cancel')
  async cancel(@Param('id') id: number, @User() user: UserMeta) {
    const profile = await this.profileService.findOne({
      where: { user: { id: user.sub } },
    });

    return this.bookingService.cancel(id, profile);
  }

  @Post('profiles')
  findProfiles(@Body() { services }: SearchProfilesDto) {
    return this.bookingService.findProfiles(services);
  }

  @Post('services')
  findServices(@Body() dto: SearchServicesDto) {
    return this.bookingService.findServices(dto);
  }

  @Post('timeslots')
  findTimeSlots(@Body() dto: SearchTimeslotsDto) {
    return this.bookingService.findTimeSlots(dto);
  }
}
