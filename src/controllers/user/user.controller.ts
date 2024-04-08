import { Body, Controller, Get, Put, SetMetadata } from '@nestjs/common';
import { UserService } from 'src/controllers/user/user.service';
import { ResetPasswordDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';

@ApiTags('User')
@SetMetadata('resource', Resource.user)
@Controller(Resource.user)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put('password')
  updatePassword(@User() user: UserMeta, @Body() body: ResetPasswordDto) {
    return this.userService.updatePassword(user.sub, body);
  }
}
