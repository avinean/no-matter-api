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

  @Get(':type/:bussinessObjectId')
  findAll(
    @Param('type') type: ServiceType,
    @Param('bussinessObjectId') bussinessObjectId: number,
  ) {
    return this.servicesService.findAll({
      type,
      bussinessObjects: [{ id: bussinessObjectId }],
    });
  }

  @Post(':type/:bussinessObjectId')
  create(
    @Param('type') type: ServiceType,
    @Param('bussinessObjectId') bussinessObjectId: number,
    @Body() dto: CreateServiceDto,
  ) {
    return this.servicesService.create({
      ...dto,
      type,
      bussinessObjects: [{ id: bussinessObjectId }],
    });
  }

  @Put(':type/:bussinessObjectId/:id')
  update(@Param('id') id: number, @Body() dto: CreateServiceDto) {
    return this.servicesService.update({ id }, dto);
  }

  @Delete(':type/:bussinessObjectId/:id')
  remove(@Param() id: number) {
    return this.servicesService.remove(id);
  }
}
