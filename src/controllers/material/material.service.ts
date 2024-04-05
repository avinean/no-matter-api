import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialEntity } from 'src/controllers/material/material.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
  ) {}

  findAll(where: FindOptionsWhere<MaterialEntity>) {
    return this.materialRepository.find({ where });
  }

  findOne(where: FindOptionsWhere<MaterialEntity>) {
    return this.materialRepository.findOne({ where });
  }

  create(dto: DeepPartial<MaterialEntity>) {
    return this.materialRepository.save(this.materialRepository.create(dto));
  }

  /**
   * The quantity can't be changed directly, it should be done through a transaction
   */
  update(
    where: FindOptionsWhere<MaterialEntity>,
    { quantity, ...dto }: Partial<MaterialEntity>,
  ) {
    return this.materialRepository.update(where, dto);
  }

  incrementQuantity(id: number, quantity: number) {
    return this.materialRepository.increment({ id }, 'quantity', quantity);
  }

  decrementQuantity(id: number, quantity: number) {
    return this.materialRepository.decrement({ id }, 'quantity', quantity);
  }

  incrementBookedQuantity(id: number, quantity: number) {
    return this.materialRepository.increment(
      { id },
      'bookedQuantity',
      quantity,
    );
  }

  decrementBookedQuantity(id: number, quantity: number) {
    return this.materialRepository.decrement(
      { id },
      'bookedQuantity',
      quantity,
    );
  }
}
