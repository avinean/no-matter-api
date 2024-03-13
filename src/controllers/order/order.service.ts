import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusEntity } from 'src/entities/order-status.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderStatusEntity)
    private orderStatusRepository: Repository<OrderStatusEntity>,
  ) {}

  async findAll(
    where: FindOptionsWhere<OrderEntity>,
    page: number = 1,
    take: number = 10,
  ) {
    const [items, total] = await this.orderRepository.findAndCount({
      where,
      relations: {
        createdBy: true,
        services: true,
        booking: true,
        statuses: {
          createdBy: true,
        },
      },
      skip: (page - 1) * take,
      take,
    });

    return {
      items,
      pages: Math.ceil(total / take),
    };
  }

  findOne(where: FindOptionsWhere<OrderEntity>) {
    return this.orderRepository.findOne({
      where,
      relations: {
        booking: true,
        statuses: {
          createdBy: true,
        },
        services: {
          service: true,
        },
        createdBy: true,
      },
    });
  }

  async create(dto: DeepPartial<OrderEntity>) {
    const order = await this.orderRepository.save(
      this.orderRepository.create(dto),
    );

    order.statuses = [
      await this.orderStatusRepository.save(
        this.orderStatusRepository.create({
          order,
          createdBy: dto.createdBy,
        }),
      ),
    ];

    return order;
  }
}
