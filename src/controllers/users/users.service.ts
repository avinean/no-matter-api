import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserEntity, UserProfileEntity } from 'src/entities/User';
import {
  CreateUserDto,
  CreateUserProfileDto,
  FindUserDto,
  FindUserProfileDto,
  UpdateUserDTO,
} from './users.dto';
import { Repository } from 'typeorm';
import { Role } from 'src/types/enums';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findAllProfiles() {
    return this.profileRepository.find();
  }

  findOne(where: FindUserDto) {
    return this.userRepository.findOne({ where });
  }

  findOneProfile(where: FindUserProfileDto) {
    return this.profileRepository.findOne({ where });
  }

  async create({ roles, ...params }: CreateUserProfileDto) {
    try {
      const profile = await this.profileRepository.save(
        this.profileRepository.create(params),
      );

      const user = await this.userRepository.save(
        this.userRepository.create({
          email: params.email,
          password: Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join(''),
        }),
      );

      await this.profileRepository.update(
        { id: profile.id },
        { userId: user.id },
      );

      roles.forEach((role) => this.addRole(profile.id, role));

      return {
        user,
        profile,
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

  update(id: number, params: UpdateUserDTO) {
    return this.userRepository.update({ id }, params);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  findRoles(profileId: number) {
    return this.roleRepository.find({ where: { profileId } });
  }

  addRole(profileId: number, role: Role) {
    return this.roleRepository.save(
      this.roleRepository.create({
        profileId,
        role,
      }),
    );
  }
}
