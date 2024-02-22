import { Module } from '@nestjs/common';
import { OrderProducts } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { BookingEntity } from 'src/entities/booking.entity';
import { OrderProductsModule } from '../order-products/order-products.module';
import { ProfileModule } from '../profile/profile.module';
import { BookingStatusEntity } from 'src/entities/booking-status.entity';

@Module({
  providers: [OrderProducts],
  controllers: [BookingController],
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      ServiceEntity,
      BookingEntity,
      BookingStatusEntity,
    ]),
    OrderProductsModule,
    ProfileModule,
  ],
})
export class BookingModule {}
