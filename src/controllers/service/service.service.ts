import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';
import { DBErrors } from 'src/types/db-errors';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
  ) {}

  async findAll(where: FindOptionsWhere<ServiceEntity>) {
    return this.serviceRepository.find({
      where,
      relations: {
        profiles: true,
      },
    });
  }

  async create(dto: DeepPartial<ServiceEntity>) {
    try {
      return this.serviceRepository.save(this.serviceRepository.create(dto));
    } catch (e) {
      if (e.errno === DBErrors.ER_DUP_ENTRY) {
        throw new ConflictException({
          message: `Duplicate found: ${e.parameters[1]}`,
          items: e.parameters,
        });
      } else {
        throw e;
      }
    }
  }

  update(
    where: FindOptionsWhere<ServiceEntity>,
    params: DeepPartial<ServiceEntity>,
  ) {
    return this.serviceRepository.update(where, params);
  }

  remove(id: number) {
    return this.serviceRepository.delete({ id });
  }

  setStatus(id: number, status: boolean) {
    return this.serviceRepository.update({ id }, { status });
  }
}
