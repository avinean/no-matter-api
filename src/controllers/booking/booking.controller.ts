import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  SearchProfilesDto,
  SearchServicesDto,
  SearchTimeslotsDto,
} from './booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('')
  findAll() {
    return this.bookingService.findAll();
  }

  @Post('')
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Post('profiles')
  findProfiles(@Body() dto: SearchProfilesDto) {
    return this.bookingService.findProfiles(dto);
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
