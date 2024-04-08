import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from 'src/controllers/business/business.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  providers: [BusinessService],
  exports: [BusinessService],
  controllers: [BusinessController],
  imports: [TypeOrmModule.forFeature([BusinessEntity]), ProfileModule],
})
export class BusinessModule {}
