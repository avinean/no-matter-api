import { Module, forwardRef } from '@nestjs/common';
import { ServiceMaterialService } from './service-material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMaterialEntity } from 'src/controllers/service-material/service-material.entity';
import { ServicesModule } from '../service/service.module';
import { MaterialModule } from '../material/material.module';

@Module({
  providers: [ServiceMaterialService],
  imports: [
    TypeOrmModule.forFeature([ServiceMaterialEntity]),
    forwardRef(() => ServicesModule),
    MaterialModule,
  ],
  exports: [ServiceMaterialService],
})
export class ServiceMaterialModule {}
