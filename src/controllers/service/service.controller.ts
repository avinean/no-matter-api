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
import { ServiceEntity } from 'src/controllers/service/service.entity';
import { FindOptionsWhere, Like } from 'typeorm';
import { UserMeta } from 'src/types/common';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Serive')
@SetMetadata('resource', Resource.service)
@Controller(Resource.service)
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Get(':type')
  findAll(
    @User() user: UserMeta,
    @Param('type') type: ServiceType,
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('search') search: string,
  ) {
    const where: FindOptionsWhere<ServiceEntity> = {
      type,
      relatedBusinessObjects: [{ id: user.bisid }],
    };

    if (search) {
      where.name = Like(`%${search}%`);
    }

    return this.servicesService.findAll(where, page, take);
  }

  @Post(':type')
  create(
    @User() user: UserMeta,
    @Param('type') type: ServiceType,
    @Body() dto: CreateServiceDto,
  ) {
    return this.servicesService.create({
      ...dto,
      type,
      relatedBusinessObjects: [{ id: user.bisid }],
    });
  }

  @Put(':type/:id')
  update(
    @User() user: UserMeta,
    @Param('id') id: number,
    @Body() dto: ServiceEntity,
  ) {
    return this.servicesService.update(
      { id, relatedBusinessObjects: { id: user.objid } },
      dto,
    );
  }

  @Delete(':type/:id')
  remove(@Param() id: number) {
    return this.servicesService.remove(id);
  }
}
