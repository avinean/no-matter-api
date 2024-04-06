import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/controllers/user/user.entity';
import { ProfileEntity } from 'src/controllers/profile/profile.entity';
import { ResetPasswordDto } from './user.dto';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  findAll() {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
      relations: {
        associatedProfiles: {
          roles: true,
          primaryFor: true,
        },
      },
    });
  }

  findOne(dto: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(dto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  async updatePassword(id: number, { password }: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id, password },
    });
    user.password = password;
    return this.userRepository.save(user);
  }
}
