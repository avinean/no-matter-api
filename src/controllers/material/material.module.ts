import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MaterialEntity,
  MaterialTransactionEntity,
} from 'src/entities/Material';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity, MaterialTransactionEntity]),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
