import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { CreateUserDto, FindUserDto, UpdateUserDTO } from './users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(where: FindUserDto) {
    return this.userRepository.findOne({ where });
  }

  create(params: CreateUserDto) {
    const user = this.userRepository.create(params);
    return this.userRepository.save(user);
  }

  update(id: number, params: UpdateUserDTO) {
    return this.userRepository.update({ id }, params);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
