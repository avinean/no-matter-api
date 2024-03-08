import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './service.dto';
import { ServiceType } from 'src/types/enums';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { ServiceEntity } from 'src/entities/service.entity';
import { FindOptionsWhere, Like } from 'typeorm';

@ApiTags('Serive')
@SetMetadata('resource', Resource.service)
@Controller(Resource.service)
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Get(':type/:businessObjectId')
  findAll(
    @Param('type') type: ServiceType,
    @Param('businessObjectId') businessObjectId: number,
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('search') search: string,
  ) {
    const where: FindOptionsWhere<ServiceEntity> = {
      type,
      relatedBusinessObjects: [{ id: businessObjectId }],
    };

    if (search) {
      where.name = Like(`%${search}%`);
    }
    console.log(where);
    return this.servicesService.findAll(where, page, take);
  }

  @Post(':type/:businessObjectId')
  create(
    @Param('type') type: ServiceType,
    @Param('businessObjectId') businessObjectId: number,
    @Body() dto: CreateServiceDto,
  ) {
    return this.servicesService.create({
      ...dto,
      type,
      relatedBusinessObjects: [{ id: businessObjectId }],
    });
  }

  @Put(':type/:businessObjectId/:id')
  update(@Param('id') id: number, @Body() dto: ServiceEntity) {
    return this.servicesService.update({ id }, dto);
  }

  @Delete(':type/:businessObjectId/:id')
  remove(@Param() id: number) {
    return this.servicesService.remove(id);
  }
}
