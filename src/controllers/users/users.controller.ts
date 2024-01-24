import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from 'src/controllers/users/users.service';
import { CreateUserDto } from './users.dto';
import { Role } from 'src/types/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  findMe(@Req() req) {
    return this.userService.findOne({ id: req.user.sub });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Post()
  create(@Body() userDTO: CreateUserDto) {
    return this.userService.create(userDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    userDTO: CreateUserDto,
  ) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get(':id/roles')
  findRoles(@Param('id') id: number) {
    return this.userService.findRoles(id);
  }

  @Post(':id/roles')
  addRole(@Param('id') id: number, @Body('role') role: Role) {
    return this.userService.addRole(id, role);
  }
}
