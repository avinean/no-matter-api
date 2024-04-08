import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BusinessService } from '../business/business.service';
import { BusinessObjectService } from '../business-object/business-object.service';
import { Role } from 'src/types/roles';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/controllers/role/role.entity';
import { ProfileService } from '../profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { UserMeta } from 'src/types/common';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
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
        primaryBusiness: true,
        primaryBusinessObject: true,
        user: true,
        roles: true,
      },
    });

    if (!profile) throw new UnauthorizedException();

    const payload: UserMeta = {
      bisid: profile.primaryBusiness.id,
      objid: profile.primaryBusinessObject.id,
      sub: profile.user.id,
      pub: profile.id,
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
    const business = await this.businessService.createTmp();
    const object = await this.objectService.createTmp(business);
    await this.profileService.update(
      { id: profile.id },
      {
        businesses: [business],
        primaryBusiness: business,
        primaryBusinessObject: object,
      },
    );

    await this.mailService.sendUserConfirmation(profile);
    return profile;
  }
}
