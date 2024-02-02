import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from 'src/entities/User';
import {
  CreateUserProfileDto,
  FindUserDto,
  FindUserProfileDto,
  ResetPasswordDto,
  UpdateUserProfileDto,
} from './users.dto';
import { Repository } from 'typeorm';
import { DBErrors } from 'src/types/db-errors';
import { ProfileConfig } from 'src/types/config';
import { Role } from 'src/types/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findAllProfiles() {
    return this.profileRepository.find({ relations: ['services'] });
  }

  findOne(where: FindUserDto) {
    return this.userRepository.findOne({ where });
  }

  findOneProfile(where: FindUserProfileDto) {
    return this.profileRepository.findOne({ where });
  }

  async findMe(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id } },
      relations: {
        bussinesses: {
          objects: true,
        },
      },
    });

    const config: ProfileConfig = {
      allowSeeBussiness: profile.roles.includes(Role.admin),
      allowSeeMaterails: profile.roles.includes(Role.admin),
      allowSeeProducts: profile.roles.includes(Role.admin),
      allowSeeProfile: profile.roles.includes(Role.admin),
      allowSeeServices: profile.roles.includes(Role.admin),
      allowSeeUsers: profile.roles.includes(Role.admin),
    };

    return {
      profile,
      config,
    };
  }

  async create({ services, ...params }: CreateUserProfileDto) {
    try {
      const profile = await this.profileRepository.save(
        this.profileRepository.create(params),
      );

      const user = await this.userRepository.save(
        this.userRepository.create({
          phone: params.phone,
          password: Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join(''),
        }),
      );

      profile.user = user;
      profile.services = services;

      await this.profileRepository.save(profile);

      return profile;
    } catch (e) {
      if (e.errno === DBErrors.ER_DUP_ENTRY) {
        throw new ConflictException({
          message: `Duplicate found`,
          items: e.parameters,
        });
      } else {
        throw e;
      }
    }
  }

  async update(id: number, params: UpdateUserProfileDto) {
    try {
      const profile = await this.profileRepository.findOne({ where: { id } });
      Object.assign(profile, params);
      await this.profileRepository.save(profile);
    } catch (e) {
      if (e.errno === DBErrors.ER_DUP_ENTRY) {
        throw new ConflictException({
          message: `Duplicate found`,
          items: e.parameters,
        });
      } else {
        throw e;
      }
    }
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  async updatePassword(id: number, body: ResetPasswordDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: profile.userId, password: body.password },
    });

    user.password = body.newPassword;
    return this.userRepository.save(user);
  }
}
