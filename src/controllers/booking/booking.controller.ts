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
import { BookingService } from './booking.service';
import {
  SearchProfilesDto,
  SearchServicesDto,
  SearchTimeslotsDto,
} from './booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { BookingEntity } from 'src/entities/booking.entity';
import { ProfileService } from '../profile/profile.service';

@ApiTags('Booking')
@SetMetadata('resource', Resource.booking)
@Controller(Resource.booking)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly profileService: ProfileService,
  ) {}

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.bookingService.findAll({
      businessObject: { id: businessObjectId },
    });
  }

  @Post(':businessObjectId')
  async create(
    @Body() dto: BookingEntity,
    @Param('businessObjectId') businessObjectId: number,
    @Req() req,
  ) {
    const profile = await this.profileService.findOne({
      where: { user: { id: req.user.sub } },
    });

    return this.bookingService.create(
      {
        ...dto,
        businessObject: {
          id: businessObjectId,
        },
      },
      profile,
    );
  }

  @Put(':businessObjectId/:id')
  async update(
    @Body() dto: BookingEntity,
    @Param('businessObjectId') businessObjectId: number,
    @Param('id') id: number,
    @Req() req,
  ) {
    const profile = await this.profileService.findOne({
      where: { user: { id: req.user.sub } },
    });

    return this.bookingService.update(
      {
        id,
      },
      {
        ...dto,
        businessObject: {
          id: businessObjectId,
        },
      },
      profile,
    );
  }

  @Put(':businessObjectId/:id/confirm')
  async confirm(
    @Param('businessObjectId') businessObjectId: number,
    @Param('id') id: number,
    @Req() req,
  ) {
    const profile = await this.profileService.findOne({
      where: { user: { id: req.user.sub } },
    });

    const a = await this.bookingService.confirm(id, profile);
    console.log('!!!!!!', a);
    return a;
  }

  @Put(':businessObjectId/:id/cancel')
  async cancel(
    @Param('businessObjectId') businessObjectId: number,
    @Param('id') id: number,
    @Req() req,
  ) {
    const profile = await this.profileService.findOne({
      where: { user: { id: req.user.sub } },
    });

    return this.bookingService.cancel(id, profile);
  }

  @Post(':businessObjectId/profiles')
  findProfiles(@Body() { services }: SearchProfilesDto) {
    return this.bookingService.findProfiles(services);
  }

  @Post(':businessObjectId/services')
  findServices(@Body() dto: SearchServicesDto) {
    return this.bookingService.findServices(dto);
  }

  @Post(':businessObjectId/timeslots')
  findTimeSlots(@Body() dto: SearchTimeslotsDto) {
    return this.bookingService.findTimeSlots(dto);
  }
}
