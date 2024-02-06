import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':bussinessId')
  findAll(@Param('bussinessId') bussinessId: number) {
    return this.roleService.findAll(bussinessId);
  }

  @Post(':bussinessId')
  create(
    @Param('bussinessId') bussinessId: number,
    @Body() dto: CreateRoleDto,
  ) {
    return this.roleService.create(bussinessId, dto);
  }

  @Put(':bussinessId/:id')
  update(
    @Param('bussinessId') bussinessId: number,
    @Param('id') id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, dto);
  }
}
