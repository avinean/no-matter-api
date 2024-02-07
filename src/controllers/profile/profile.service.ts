import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { BussinessObjectEntity } from 'src/entities/bussiness-object.entity';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  findAllProfiles(bussinessObjectId: number) {
    return this.profileRepository.find({
      where: { employers: { id: bussinessObjectId } },
      relations: ['services', 'roles'],
    });
  }

  findOneProfile(dto: FindOneOptions<ProfileEntity>) {
    return this.profileRepository.findOne(dto);
  }

  async create(
    { services, ...params }: CreateProfileDto,
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
    params: UpdateProfileDto,
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
