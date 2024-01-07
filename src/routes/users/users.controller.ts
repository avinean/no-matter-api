import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/routes/users/users.service';
import { CreateUserDto } from './users.dto';
import { Role } from 'src/types/role';
import { Roles } from 'src/decorators/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles([Role.Admin, Role.Owner])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Roles([Role.Admin, Role.Owner])
  @Post()
  create(@Body() userDTO: CreateUserDto) {
    return this.userService.create(userDTO);
  }

  @Roles([Role.Admin, Role.Owner])
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    userDTO: CreateUserDto,
  ) {
    return this.userService.update(id, userDTO);
  }

  @Roles([Role.Admin, Role.Owner])
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get(':id/roles')
  findRoles(@Param('id') id: number) {
    return this.userService.findRoles(id);
  }

  @Roles([Role.Admin, Role.Owner])
  @Post(':id/roles')
  addRole(@Param('id') id: number, @Body('role') role: Role) {
    return this.userService.addRole(id, role);
  }
}
