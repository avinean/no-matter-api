import { Module } from '@nestjs/common';
import { MaterialTransactionService } from './material-transaction.service';
import { MaterialTransactionController } from './material-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialTransactionEntity } from 'src/entities/material-transaction.entity';
import { MaterialModule } from '../material/material.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialTransactionEntity]),
    MaterialModule,
    ProfileModule,
  ],
  providers: [MaterialTransactionService],
  controllers: [MaterialTransactionController],
})
export class MaterialTransactionModule {}
