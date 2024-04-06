import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Resource } from 'src/types/permissions';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';
import { DeepPartial } from 'typeorm';
import { RoleEntity } from './role.entity';

@SetMetadata('resource', Resource.role)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@User() user: UserMeta) {
    return this.roleService.findAll({ business: { id: user.bisid } });
  }

  @Post()
  create(@User() user: UserMeta, @Body() dto: DeepPartial<RoleEntity>) {
    return this.roleService.create({
      ...dto,
      business: { id: user.bisid },
    });
  }

  @Put(':id')
  update(
    @User() user: UserMeta,
    @Param('id') id: number,
    @Body() dto: DeepPartial<RoleEntity>,
  ) {
    return this.roleService.update(
      {
        id,
        business: { id: user.bisid },
      },
      dto,
    );
  }
}
