import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { BookingEntity } from 'src/entities/booking.entity';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, ServiceEntity, BookingEntity]),
  ],
})
export class BookingModule {}
