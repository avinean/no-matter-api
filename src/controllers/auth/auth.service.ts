import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/controllers/user/user.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BussinessService } from '../bussiness/bussiness.service';
import { BussinessObjectService } from '../bussiness-object/bussiness-object.service';
import { Role } from 'src/types/roles';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private bussinessService: BussinessService,
    private objectService: BussinessObjectService,
    private jwtService: JwtService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async signIn(where: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ where });
    if (!user) throw new UnauthorizedException();
    const profile = await this.usersService.findOneProfile({
      where: { user },
      relations: ['roles'],
    });
    console.log(profile);

    if (!user) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      sud: profile.roles,
      phone: user.phone,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const roles = await this.roleRepository.find({
      where: { name: Role.admin },
    });
    const profile = await this.usersService.create({
      ...dto,
      roles: roles,
    } as any);
    const bussiness = await this.bussinessService.createTmp(profile);
    await this.objectService.createTmp(bussiness, profile);
    return profile;
  }
}
