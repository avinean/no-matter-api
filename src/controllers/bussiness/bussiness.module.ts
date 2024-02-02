import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessEntity, BussinessObjectEntity } from 'src/entities/Bussiness';

@Module({
  providers: [BussinessService],
  exports: [BussinessService],
  controllers: [BussinessController],
  imports: [TypeOrmModule.forFeature([BussinessEntity, BussinessObjectEntity])],
})
export class BussinessModule {}
