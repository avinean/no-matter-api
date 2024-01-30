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
import { CreateUserProfileDto, UpdateUserProfileDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

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

  @Public()
  @Post()
  create(@Body() dto: CreateUserProfileDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    userDTO: UpdateUserProfileDto,
  ) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
