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
    private readonly orderProductsRepository: Repository<OrderProductsEntity>,
    private readonly serviceService: ServiceService,
    private readonly materialTransactionService: MaterialTransactionService,
  ) {}

  async update(dto: DeepPartial<OrderProductsEntity>[]) {
    const existingRecords = await this.orderProductsRepository.find({
      where: {
        booking: In(dto.map((item) => item.booking.id)),
      },
      relations: {
        service: true,
        booking: true,
      },
    });

    // Find records to be added or updated
    const recordsToAddOrUpdate = dto.map((booking) => {
      const existing = existingRecords.find(
        (item) =>
          item.booking.id === booking.booking.id &&
          item.service.id === booking.service.id,
      );
      if (existing) {
        existing.quantity = booking.quantity;
        return existing;
      }
      return this.orderProductsRepository.create(booking);
    });

    // Find records to be removed
    const recordsToRemove = existingRecords.filter((existingRecord) => {
      const dtoItem = dto.find(
        (item) =>
          item.booking.id === existingRecord.booking.id &&
          item.service.id === existingRecord.service.id,
      );
      return !dtoItem;
    });

    // Add or update records
    await this.orderProductsRepository.save(recordsToAddOrUpdate);

    // Remove records
    await this.orderProductsRepository.remove(recordsToRemove);
  }
}
