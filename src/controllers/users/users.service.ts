import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserEntity } from 'src/entities/User';
import { CreateUserDto, FindUserDto, UpdateUserDTO } from './users.dto';
import { Repository } from 'typeorm';
import { Role } from 'src/types/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(where: FindUserDto) {
    return this.userRepository.findOne({ where });
  }

  async create(params: CreateUserDto) {
    const user = this.userRepository.create(params);
    await this.userRepository.save(user);

    const role = this.roleRepository.create({
      userId: user.id,
    });
    await this.roleRepository.save(role);

    return user;
  }

  update(id: number, params: UpdateUserDTO) {
    return this.userRepository.update({ id }, params);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  findRoles(userId: number) {
    return this.roleRepository.find({ where: { userId } });
  }

  addRole(userId: number, role: Role) {
    return this.roleRepository.save(
      this.roleRepository.create({
        userId,
        role,
      }),
    );
  }
}
