import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from 'src/entities/User';
import { ServiceEntity } from 'src/entities/Services';
import { BookingEntity } from 'src/entities/Booking';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [
    TypeOrmModule.forFeature([UserProfileEntity, ServiceEntity, BookingEntity]),
  ],
})
export class BookingModule {}
