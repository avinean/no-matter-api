import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/controllers/service/service.entity';
import { ServiceMaterialModule } from '../service-material/service-material.module';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
  imports: [TypeOrmModule.forFeature([ServiceEntity]), ServiceMaterialModule],
})
export class ServicesModule {}
