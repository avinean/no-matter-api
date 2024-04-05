import { Module } from '@nestjs/common';
import { MaterialTransactionService } from './material-transaction.service';
import { MaterialTransactionController } from './material-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialTransactionEntity } from 'src/controllers/material-transaction/material-transaction.entity';
import { MaterialModule } from '../material/material.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialTransactionEntity]),
    MaterialModule,
    ProfileModule,
  ],
  exports: [MaterialTransactionService],
  providers: [MaterialTransactionService],
  controllers: [MaterialTransactionController],
})
export class MaterialTransactionModule {}
