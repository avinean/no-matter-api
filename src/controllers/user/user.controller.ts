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
import { UserService } from 'src/controllers/user/user.service';
import {
  CreateUserProfileDto,
  ResetPasswordDto,
  UpdateUserProfileDto,
} from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('password')
  updatePassword(@Req() req, @Body() body: ResetPasswordDto) {
    return this.userService.updatePassword(req.user.sub, body);
  }

  @Roles(['*'])
  @Get('me')
  findMe(@Req() req) {
    console.log('req.user.sub', req.user.sub);
    return this.userService.findMe(req.user.sub);
  }

  @Get(':bussinessObjectId')
  findAll(@Param('bussinessObjectId') bussinessObjectId: number) {
    return this.userService.findAllProfiles(bussinessObjectId);
  }

  @Post(':bussinessObjectId')
  create(
    @Body() dto: CreateUserProfileDto,
    @Param('bussinessObjectId') bussinessObjectId: number,
  ) {
    return this.userService.create(dto, bussinessObjectId);
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
