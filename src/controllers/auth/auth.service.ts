import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/controllers/users/users.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto);
    const profile = await this.usersService.findMe(user.id);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id, sud: profile.roles.split(','), email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
