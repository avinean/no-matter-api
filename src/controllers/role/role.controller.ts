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
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { Resource } from 'src/types/permissions';

@SetMetadata('resource', Resource.role)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':businessId')
  findAll(@Param('businessId') businessId: number) {
    return this.roleService.findAll(businessId);
  }

  @Post(':businessId')
  create(@Param('businessId') businessId: number, @Body() dto: CreateRoleDto) {
    return this.roleService.create(businessId, dto);
  }

  @Put(':businessId/:id')
  update(
    @Param('businessId') businessId: number,
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, dto);
  }
}
