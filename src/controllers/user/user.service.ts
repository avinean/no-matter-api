import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import {
  CreateUserProfileDto,
  ResetPasswordDto,
  UpdateUserProfileDto,
} from './user.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { DBErrors } from 'src/types/db-errors';
import { ProfileConfig } from 'src/types/config';
import { BussinessObjectEntity } from 'src/entities/bussiness-object.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
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

  findOneProfile(dto: FindOneOptions<ProfileEntity>) {
    return this.profileRepository.findOne(dto);
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

  async update(
    bussinessObjectId: number,
    id: number,
    params: UpdateUserProfileDto,
  ) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id, employers: [{ id: bussinessObjectId }] },
      });
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

  async findMe(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id } },
      relations: {
        bussinesses: {
          objects: true,
        },
        roles: {
          permissions: true,
        },
      },
    });

    const hasBussiness = profile.bussinesses.length > 0;

    const config: ProfileConfig = {
      allowSeeBussinesses: hasBussiness,
      allowSeeObjects: hasBussiness,
      allowSeeBussinessSelector: hasBussiness,
      allowSeeObjectSelector: hasBussiness,
      allowSeeEmployees: hasBussiness,
      allowAddEmployee: hasBussiness,
    };

    return {
      profile,
      config,
    };
  }
}
