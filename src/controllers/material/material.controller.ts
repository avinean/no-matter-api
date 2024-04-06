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
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('Material')
@SetMetadata('resource', Resource.material)
@Controller(Resource.material)
export class MaterialController {
  constructor(private readonly materialsService: MaterialService) {}

  @Get()
  findAll(@User() user: UserMeta) {
    return this.materialsService.findAll({
      businessObject: { id: user.objid },
    });
  }

  @Post()
  create(@Body() dto: CreateMaterialDto, @User() user: UserMeta) {
    return this.materialsService.create({
      ...dto,
      businessObject: { id: user.objid },
    });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: CreateMaterialDto,
    @User() user: UserMeta,
  ) {
    return this.materialsService.update(
      {
        id,
        businessObject: { id: user.objid },
      },
      dto,
    );
  }
}
