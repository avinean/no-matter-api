import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceMaterialEntity } from 'src/entities/service-material.entity';
import { Repository, In, DeepPartial } from 'typeorm';

@Injectable()
export class ServiceMaterialService {
  constructor(
    @InjectRepository(ServiceMaterialEntity)
    private serviceMaterialRepository: Repository<ServiceMaterialEntity>,
  ) {}

  async update(dto: DeepPartial<ServiceMaterialEntity>[]) {
    const existingRecords = await this.serviceMaterialRepository.find({
      where: {
        service: In(dto.map((item) => item.service.id)),
      },
      relations: {
        service: true,
        material: true,
      },
    });

    // Find records to be added or updated
    const recordsToAddOrUpdate = dto.map((material) => {
      const existing = existingRecords.find(
        (item) =>
          item.service.id === material.service.id &&
          item.material.id === material.material.id,
      );
      if (existing) {
        existing.quantity = material.quantity;
        return existing;
      }
      return this.serviceMaterialRepository.create(material);
    });

    // Find records to be removed
    const recordsToRemove = existingRecords.filter((existingRecord) => {
      const dtoItem = dto.find(
        (item) =>
          item.service.id === existingRecord.service.id &&
          item.material.id === existingRecord.material.id,
      );
      return !dtoItem;
    });

    // Add or update records
    await this.serviceMaterialRepository.save(recordsToAddOrUpdate);

    // Remove records
    await this.serviceMaterialRepository.remove(recordsToRemove);
  }
}
