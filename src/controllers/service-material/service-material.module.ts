import { Module, forwardRef } from '@nestjs/common';
import { ServiceMaterialService } from './service-material.service';
import { ServiceMaterialController } from './service-material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMaterialEntity } from 'src/entities/service-material.entity';
import { ServicesModule } from '../service/service.module';
import { MaterialModule } from '../material/material.module';

@Module({
  providers: [ServiceMaterialService],
  controllers: [ServiceMaterialController],
  imports: [
    TypeOrmModule.forFeature([ServiceMaterialEntity]),
    forwardRef(() => ServicesModule),
    MaterialModule,
  ],
  exports: [ServiceMaterialService],
})
export class ServiceMaterialModule {}
