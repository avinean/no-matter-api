import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './service.dto';
import { ServiceType } from 'src/types/enums';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Serive')
@SetMetadata('resource', Resource.service)
@Controller(Resource.service)
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Get(':type')
  findAll(@Param('type') type: ServiceType) {
    return this.servicesService.findAll(type);
  }

  @Get(':type/:id')
  findOne(@Param('id') id: number) {
    return this.servicesService.findOne(id);
  }

  @Post(':type/')
  create(@Param('type') type: ServiceType, @Body() dto: CreateServiceDto) {
    return this.servicesService.create(type, dto);
  }

  @Put(':type/:id')
  update(@Param('id') id: number, @Body() dto: CreateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':type/:id')
  remove(@Param() id: number) {
    return this.servicesService.remove(id);
  }
}
