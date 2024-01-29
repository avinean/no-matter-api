import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserProfileDto } from '../users/users.dto';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: CreateUserProfileDto) {
    return this.userService.createProfile(dto);
  }
}
