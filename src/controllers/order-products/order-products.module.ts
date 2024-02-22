import { Module } from '@nestjs/common';
import { OrderProductsController } from './order-products.controller';
import { OrderProductsService } from './order-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductsEntity } from 'src/entities/order-products.entity';
import { ServicesModule } from '../service/service.module';
import { MaterialTransactionModule } from '../material-transaction/material-transaction.module';

@Module({
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
  exports: [OrderProductsService],
  imports: [
    TypeOrmModule.forFeature([OrderProductsEntity]),
    ServicesModule,
    MaterialTransactionModule,
  ],
})
export class OrderProductsModule {}
