import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingServiceEntity } from 'src/entities/booking-service.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { ServiceService } from '../service/service.service';
import { MaterialTransactionService } from '../material-transaction/material-transaction.service';

@Injectable()
export class BookingServiceService {
  constructor(
    @InjectRepository(BookingServiceEntity)
    private readonly bookingServiceRepository: Repository<BookingServiceEntity>,
    private readonly serviceService: ServiceService,
    private readonly materialTransactionService: MaterialTransactionService,
  ) {}

  async update(dto: DeepPartial<BookingServiceEntity>[]) {
    const booking = dto[0].booking;
    // const existingRecords = await this.bookingServiceRepository.find({
    //   where: {
    //     booking: In(dto.map((item) => item.booking.id)),
    //   },
    //   relations: {
    //     service: true,
    //     booking: true,
    //   },
    // });

    // todo: update existing records
    // todo: remove records that are not in dto

    await this.bookingServiceRepository.save(
      dto.map((service) => this.bookingServiceRepository.create(service)),
    );

    (
      await this.serviceService.findAll({
        id: In(dto.map((item) => item.service.id)),
      })
    )
      .flatMap(({ spending }) =>
        spending.map(({ quantity, material: { id } }) => ({ id, quantity })),
      )
      .reduce((acc, { id, quantity }) => {
        const existingIndex = acc.findIndex((item) => item.id === id);

        if (existingIndex !== -1) acc[existingIndex].quantity += quantity;
        else acc.push({ id, quantity });

        return acc;
      }, [])
      .forEach(({ id, quantity }) => {
        this.materialTransactionService.book({
          material: { id },
          quantity,
          booking,
          initiator: booking.createdBy,
          businessObject: booking.businessObject,
        });
      });
  }
}
