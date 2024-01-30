import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UsersService,
    private readonly servicesService: ServicesService,
  ) { }
  
  
}
