import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { DeepPartial } from 'typeorm';
import { OrderEntity } from 'src/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.orderService.findAll({
      businessObject: { id: businessObjectId },
    });
  }

  @Post(':businessObjectId')
  async create(
    @Param('businessObjectId') businessObjectId: number,
    @Req() req,
    dto: DeepPartial<OrderEntity>,
  ) {
    return this.orderService.create({
      ...dto,
      businessObject: { id: businessObjectId },
      createdBy: { id: req.user.id },
    });
  }
}
