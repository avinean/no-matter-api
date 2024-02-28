import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
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

  async updatePassword(profileId: number, body: ResetPasswordDto) {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    const user = await this.userRepository.findOne({
      where: { id: profile.userId, password: body.password },
    });

    user.password = body.newPassword;
    return this.userRepository.save(user);
  }
}
