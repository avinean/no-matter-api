import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessEntity } from 'src/entities/bussiness.entity';

@Module({
  providers: [BussinessService],
  exports: [BussinessService],
  controllers: [BussinessController],
  imports: [TypeOrmModule.forFeature([BussinessEntity])],
})
export class BussinessModule {}
