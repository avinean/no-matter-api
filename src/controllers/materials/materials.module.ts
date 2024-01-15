import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MaterialEntity,
  MaterialTransactionEntity,
} from 'src/entities/Material';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity, MaterialTransactionEntity]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
