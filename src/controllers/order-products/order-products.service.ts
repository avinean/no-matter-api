import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductsEntity } from 'src/entities/order-products.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { ServiceService } from '../service/service.service';
import { MaterialTransactionService } from '../material-transaction/material-transaction.service';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProductsEntity)
    private readonly bookingServiceRepository: Repository<OrderProductsEntity>,
    private readonly serviceService: ServiceService,
    private readonly materialTransactionService: MaterialTransactionService,
  ) {}

  async update(dto: DeepPartial<OrderProductsEntity>[]) {
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
  }
}
