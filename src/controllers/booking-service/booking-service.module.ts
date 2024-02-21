import { Module } from '@nestjs/common';
import { BookingServiceController } from './booking-service.controller';
import { BookingServiceService } from './booking-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingServiceEntity } from 'src/entities/booking-service.entity';
import { ServicesModule } from '../service/service.module';
import { MaterialTransactionModule } from '../material-transaction/material-transaction.module';

@Module({
  controllers: [BookingServiceController],
  providers: [BookingServiceService],
  exports: [BookingServiceService],
  imports: [
    TypeOrmModule.forFeature([BookingServiceEntity]),
    ServicesModule,
    MaterialTransactionModule,
  ],
})
export class BookingServiceModule {}
