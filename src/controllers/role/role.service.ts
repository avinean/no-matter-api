import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/controllers/role/role.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(businessId: number) {
    return this.roleRepository.find({
      relations: {
        assignedPermissions: true,
      },
      where: { business: { id: businessId } },
    });
  }

  async findOne(where: FindOptionsWhere<RoleEntity> = {}) {
    return this.roleRepository.find({
      relations: {
        assignedPermissions: true,
      },
      where,
    });
  }

  async create(businessId: number, dto: CreateRoleDto) {
    return this.roleRepository.save(
      this.roleRepository.create({
        ...dto,
        business: { id: businessId },
      }),
    );
  }

  async update(id: number, dto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    Object.assign(role, dto);
    return this.roleRepository.save(role);
  }
}
