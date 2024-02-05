import { Module } from '@nestjs/common';
import { BussinessObjectService } from './bussiness-object.service';
import { BussinessObjectController } from './bussiness-object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessObjectEntity } from 'src/entities/bussiness-object.entity';

@Module({
  providers: [BussinessObjectService],
  controllers: [BussinessObjectController],
  exports: [BussinessObjectService],
  imports: [TypeOrmModule.forFeature([BussinessObjectEntity])],
})
export class BussinessObjectsModule {}
