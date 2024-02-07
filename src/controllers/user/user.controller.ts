import { Body, Controller, Put, Req, SetMetadata } from '@nestjs/common';
import { UserService } from 'src/controllers/user/user.service';
import { ResetPasswordDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Resource } from 'src/types/permissions';

@ApiTags('User')
@SetMetadata('resource', Resource.user)
@Controller(Resource.user)
export class UserController {
  constructor(private userService: UserService) {}

  @Put('password')
  updatePassword(@Req() req, @Body() body: ResetPasswordDto) {
    return this.userService.updatePassword(req.user.sub, body);
  }
}
