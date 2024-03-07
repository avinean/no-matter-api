import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BusinessService } from '../business/business.service';
import { BusinessObjectService } from '../business-object/business-object.service';
import { Role } from 'src/types/roles';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { ProfileService } from '../profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private businessService: BusinessService,
    private objectService: BusinessObjectService,
    private jwtService: JwtService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async signIn(dto: SignInDto): Promise<{ access_token: string }> {
    const profile = await this.profileService.findOne({
      where: { user: dto, primaryFor: dto },
      relations: {
        user: true,
        roles: true,
      },
    });

    if (!profile) throw new UnauthorizedException();

    const payload = {
      sub: profile.user.id,
      sud: profile.roles,
      email: profile.user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const roles = await this.roleRepository.find({
      where: { name: Role.admin },
    });
    const profile = await this.profileService.create({
      ...dto,
      roles: roles,
    } as any);
    const business = await this.businessService.createTmp(profile);
    await this.objectService.createTmp(business, profile);
    return profile;
  }
}
