import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserProfileEntity } from 'src/entities/User';
import {
  CreateUserProfileDto,
  ResetPasswordDto,
  UpdateUserProfileDto,
} from './users.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { DBErrors } from 'src/types/db-errors';
import { ProfileConfig } from 'src/types/config';
import { Role } from 'src/types/enums';
import { BussinessObjectEntity } from 'src/entities/Bussiness';

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

  findAllProfiles(bussinessObjectId: number) {
    return this.profileRepository.find({
      where: { employers: { id: bussinessObjectId } },
      relations: ['services'],
    });
  }

  findOne(dto: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(dto);
  }

  findOneProfile(dto: FindOneOptions<UserProfileEntity>) {
    return this.profileRepository.findOne(dto);
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
      allowSeeCatalog: profile.roles.includes(Role.admin),
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

  async create(
    { services, ...params }: CreateUserProfileDto,
    bussinessObjectId?: number,
  ) {
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

      const employer = new BussinessObjectEntity();
      employer.id = bussinessObjectId;

      profile.user = user;
      profile.services = services;
      profile.employers = [employer];

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
