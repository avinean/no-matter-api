import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { ServiceEntity } from 'src/entities/service.entity';
import { BookingEntity } from 'src/entities/booking.entity';
import { OrderProductsModule } from '../order-products/order-products.module';
import { ProfileModule } from '../profile/profile.module';
import { BookingStatusEntity } from 'src/entities/booking-status.entity';
import { OrderModule } from '../order/order.module';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      ServiceEntity,
      BookingEntity,
      BookingStatusEntity,
      OrderModule,
    ]),
    OrderModule,
    OrderProductsModule,
    ProfileModule,
  ],
  exports: [BookingService],
})
export class BookingModule {}
