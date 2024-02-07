import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { UpdateProfileDto } from './profile.dto';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  findAll(dto: FindManyOptions<ProfileEntity>) {
    return this.profileRepository.find(dto);
  }

  findOne(dto: FindOneOptions<ProfileEntity>) {
    return this.profileRepository.findOne(dto);
  }

  async create(params: DeepPartial<ProfileEntity>) {
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

      await this.profileRepository.update(profile.id, { user });

      return {
        ...profile,
        user,
      };
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
    where: FindOneOptions<ProfileEntity>['where'],
    params: UpdateProfileDto,
  ) {
    try {
      const profile = await this.profileRepository.findOne({
        where,
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

  async findMe(id: number) {
    return await this.profileRepository.findOne({
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
  }

  findPermissions(id: number) {
    return this.profileRepository
      .findOne({
        select: ['roles'],
        where: { user: { id } },
        relations: {
          roles: {
            permissions: true,
          },
        },
      })
      .then(({ roles }) =>
        roles.flatMap((role) =>
          role.permissions.map(
            (permission) => `${permission.resource}:${permission.action}`,
          ),
        ),
      );
  }
}
