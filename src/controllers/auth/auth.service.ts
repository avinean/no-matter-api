import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/controllers/users/users.service';
import { SetNewPasswordDto, SignInDto, SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthUrlsEntity } from 'src/entities/AuthUrls';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AuthUrlsEntity)
    private readonly authUrlsRepository: Repository<AuthUrlsEntity>,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto);

    if (!user) throw new UnauthorizedException();

    const roles = (await this.usersService.findRoles(user.id)).map(
      ({ role }) => role,
    );
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, sud: roles, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  signUp(dto: SignUpDto) {
    return this.authUrlsRepository.save(
      this.authUrlsRepository.create({
        ...dto,
        id: randomUUID(),
      }),
    );
  }

  async setNewPassword({ id, password, username }: SetNewPasswordDto) {
    const { email } = await this.authUrlsRepository.findOne({ where: { id } });
    this.authUrlsRepository.delete({ id });
    const user = await this.usersService.create({
      email,
      password,
      username,
    });
    return user;
  }
}
