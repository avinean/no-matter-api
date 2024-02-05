import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
})
export class ServicesModule {}
