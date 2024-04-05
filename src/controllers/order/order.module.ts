import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/controllers/order/order.entity';
import { OrderStatusEntity } from 'src/controllers/order/order-status.entity';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderStatusEntity])],
  exports: [OrderService],
})
export class OrderModule {}
