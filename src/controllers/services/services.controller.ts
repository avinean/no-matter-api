import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './services.dto';
import { ServiceType } from 'src/types/enums';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

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
