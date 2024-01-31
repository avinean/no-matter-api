import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { SearchProfilesDto, SearchServicesDto } from './booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('profiles')
  findProfiles(@Body() dto: SearchProfilesDto) {
    return this.bookingService.findProfiles(dto);
  }

  @Post('services')
  findServices(@Body() dto: SearchServicesDto) {
    return this.bookingService.findServices(dto);
  }
}
