import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';
import { DBErrors } from 'src/types/db-errors';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ServiceMaterialService } from '../service-material/service-material.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private readonly serviceMaterialService: ServiceMaterialService,
  ) {}

  async findAll(
    where: FindOptionsWhere<ServiceEntity>,
    page: number = 1,
    take: number = Number.MAX_SAFE_INTEGER,
  ) {
    const [items, total] = await this.serviceRepository.findAndCount({
      where,
      relations: {
        profiles: true,
        spending: {
          material: true,
        },
      },
      skip: (page - 1) * take,
      take,
    });

    return {
      items,
      pages: Math.ceil(total / take),
    };
  }

  async findOne(where: FindOptionsWhere<ServiceEntity>) {
    return this.serviceRepository.find({ where });
  }

  async create({ spending, ...params }: DeepPartial<ServiceEntity>) {
    try {
      const service = await this.serviceRepository.save(
        this.serviceRepository.create(params),
      );

      await this.serviceMaterialService.update(
        spending.map((spending) => ({
          ...spending,
          service,
        })),
      );

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

  async update(
    where: FindOptionsWhere<ServiceEntity>,
    { spending, ...params }: ServiceEntity,
  ) {
    await this.serviceMaterialService.update(
      spending.map((spending) => ({
        ...spending,
        service: { id: +where.id },
      })),
    );

    return this.serviceRepository.update(where, params);
  }

  remove(id: number) {
    return this.serviceRepository.delete({ id });
  }

  setStatus(id: number, status: boolean) {
    return this.serviceRepository.update({ id }, { status });
  }
}
