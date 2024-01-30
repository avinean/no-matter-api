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
import { CreateUserDto, CreateUserProfileDto } from './users.dto';
import { Role } from 'src/types/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAllProfiles();
  }

  @Get('me')
  findMe(@Req() req) {
    return this.userService.findMe(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneProfile({ id });
  }

  @Post()
  create(@Body() dto: CreateUserProfileDto) {
    return this.userService.create(dto);
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

  @Get(':profileId/roles')
  findRoles(@Param('profileId') id: number) {
    return this.userService.findRoles(id);
  }

  @Post(':profileId/roles')
  addRole(@Param('profileId') id: number, @Body('role') role: Role) {
    return this.userService.addRole(id, role);
  }
}
