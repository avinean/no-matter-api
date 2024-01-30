import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [UsersModule, ServicesModule],
})
export class BookingModule {}
