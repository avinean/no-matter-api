import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './material.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('Material')
@SetMetadata('resource', Resource.material)
@Controller(Resource.material)
export class MaterialController {
  constructor(private readonly materialsService: MaterialService) {}

  @Get(':businessObjectId')
  findAll(@Param('businessObjectId') businessObjectId: number) {
    return this.materialsService.findAll({
      businessObject: { id: businessObjectId },
    });
  }

  @Post(':businessObjectId')
  create(
    @Body() dto: CreateMaterialDto,
    @Param('businessObjectId') businessObjectId: number,
  ) {
    return this.materialsService.create({
      ...dto,
      businessObject: { id: businessObjectId },
    });
  }

  @Put(':businessObjectId/:id')
  update(
    @Param('id') id: number,
    @Body() dto: CreateMaterialDto,
    @Param('businessObjectId') businessObjectId: number,
  ) {
    return this.materialsService.update(
      {
        id,
        businessObject: { id: businessObjectId },
      },
      dto,
    );
  }
}
