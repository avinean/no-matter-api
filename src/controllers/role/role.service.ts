import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';
import { BussinessEntity } from 'src/entities/bussiness.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(bussinessId: number) {
    return this.roleRepository.find({
      relations: ['permissions'],
      where: { bussiness: { id: bussinessId } },
    });
  }

  async create(bussinessId: number, dto: CreateRoleDto) {
    return this.roleRepository.save(
      this.roleRepository.create({
        ...dto,
        bussiness: { id: bussinessId },
      }),
    );
  }

  async update(id: number, dto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    Object.assign(role, dto);
    return this.roleRepository.save(role);
  }
}
