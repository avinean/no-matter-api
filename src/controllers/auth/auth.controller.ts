import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserMeta } from 'src/types/common';
import { SkipPermission } from 'src/decorators/permission.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @SkipPermission()
  @Post('refresh-token')
  refreshToken(@User() user: UserMeta) {
    return this.authService.signIn({ id: user.sub });
  }

  @Public()
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
