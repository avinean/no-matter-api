import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/Services';
import { DBErrors } from 'src/types/db-errors';
import { ServiceType } from 'src/types/enums';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
  ) {}

  async findAll(type: ServiceType) {
    return this.serviceRepository.find({
      where: {
        type,
      },
      relations: ['profiles'],
    });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async create(type: ServiceType, dto: Partial<CreateServiceDto>) {
    try {
      const service = this.serviceRepository.create({
        ...dto,
        type,
      });
      await this.serviceRepository.save(service);
      return service;
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

  update(id: number, dto: Partial<CreateServiceDto>) {
    return this.serviceRepository.update({ id }, dto);
  }

  remove(id: number) {
    return this.serviceRepository.delete({ id });
  }

  setStatus(id: number, status: boolean) {
    return this.serviceRepository.update({ id }, { status });
  }
}
