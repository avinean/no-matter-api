import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
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

      const user = params.user
        ? (params.user as UserEntity)
        : await this.userRepository.save(
            this.userRepository.create({
              email: params.email,
              password: Array(6)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join(''),
            }),
          );

      await this.profileRepository.update(profile.id, {
        user,
        primaryFor: user,
      });
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
    where: FindOptionsWhere<ProfileEntity> | FindOptionsWhere<ProfileEntity>[],
    params: DeepPartial<ProfileEntity>,
  ) {
    try {
      const profile = await this.profileRepository.findOne({
        where,
      });
      Object.assign(profile, params);
      return this.profileRepository.save(profile);
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

  async primary(
    where: FindOptionsWhere<ProfileEntity> | FindOptionsWhere<ProfileEntity>[],
  ) {
    const profile = await this.profileRepository.findOne({
      where,
      relations: {
        user: true,
        primaryFor: true,
      },
    });
    const prevPrimary = await this.profileRepository.findOne({
      where: {
        primaryFor: { id: profile.user.id },
      },
    });
    prevPrimary.primaryFor = null;
    await this.profileRepository.save(prevPrimary);
    profile.primaryFor = profile.user;
    return this.profileRepository.save(profile);
  }

  async findMe(id: number) {
    return await this.profileRepository.findOne({
      where: { user: { id }, primaryFor: { id } },
      relations: {
        ownedBusinesses: {
          businessObjects: {
            schedule: true,
          },
        },
        roles: {
          assignedPermissions: true,
        },
        primaryFor: true,
        employers: true,
        schedule: true,
        calendar: true,
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
            assignedPermissions: true,
          },
        },
      })
      .then(({ roles }) =>
        roles.flatMap((role) =>
          role.assignedPermissions.map(
            (permission) =>
              `${permission.resourceType}:${permission.actionType}`,
          ),
        ),
      );
  }
}
