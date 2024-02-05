import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/controllers/users/users.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BussinessService } from '../bussiness/bussiness.service';
import { BussinessObjectService } from '../bussiness-object/bussiness-object.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bussinessService: BussinessService,
    private objectService: BussinessObjectService,
    private jwtService: JwtService,
  ) {}

  async signIn(where: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ where });
    if (!user) throw new UnauthorizedException();
    const profile = await this.usersService.findOneProfile({
      where: { user },
    });

    if (!user) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      sud: profile.roles.split(','),
      phone: user.phone,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const profile = await this.usersService.create({
      ...dto,
      roles: 'admin',
    } as any);
    const bussiness = await this.bussinessService.createTmp(profile);
    await this.objectService.createTmp(bussiness, profile);
    return profile;
  }
}
