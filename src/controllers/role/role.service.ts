import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/controllers/role/role.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(where: FindOptionsWhere<RoleEntity>) {
    return this.roleRepository.find({
      relations: {
        assignedPermissions: true,
      },
      where,
    });
  }

  async findOne(where: FindOptionsWhere<RoleEntity>) {
    return this.roleRepository.find({
      relations: {
        assignedPermissions: true,
      },
      where,
    });
  }

  async create(dto: DeepPartial<RoleEntity>) {
    return this.roleRepository.save(this.roleRepository.create(dto));
  }

  async update(
    where: FindOptionsWhere<RoleEntity>,
    dto: DeepPartial<RoleEntity>,
  ) {
    const role = await this.roleRepository.findOne({ where });
    Object.assign(role, dto);
    return this.roleRepository.save(role);
  }
}
