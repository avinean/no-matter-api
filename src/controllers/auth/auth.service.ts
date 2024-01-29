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

    if (!user) throw new UnauthorizedException();

    const roles = (await this.usersService.findRoles(user.id)).map(
      ({ role }) => role,
    );

    const payload = { sub: user.id, sud: roles, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
