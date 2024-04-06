import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { DeepPartial } from 'typeorm';
import { OrderEntity } from 'src/controllers/order/order.entity';
import { Resource } from 'src/types/permissions';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('MaterialTransaction')
@SetMetadata('resource', Resource.order)
@Controller(Resource.order)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(
    @User() user: UserMeta,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    return this.orderService.findAll(
      {
        businessObject: [{ id: user.objid }],
      },
      page,
      take,
    );
  }

  @Post()
  async create(@User() user: UserMeta, dto: DeepPartial<OrderEntity>) {
    return this.orderService.create({
      ...dto,
      businessObject: { id: user.objid },
      createdBy: { id: user.sub },
    });
  }
}
