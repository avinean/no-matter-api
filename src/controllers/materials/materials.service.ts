import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MaterialEntity,
  MaterialTransactionEntity,
} from 'src/entities/Material';
import { Repository } from 'typeorm';
import { CreateMaterialDto, CreateTransactionDto } from './materials.dto';
import { MaterialTransactionType } from 'src/types/enums';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(MaterialTransactionEntity)
    private readonly materialTransactionRepository: Repository<MaterialTransactionEntity>,
  ) {}

  findAll() {
    return this.materialRepository.find();
  }

  findOne(id: number) {
    return this.materialRepository.findOne({ where: { id } });
  }

  create(dto: CreateMaterialDto) {
    return this.materialRepository.save(this.materialRepository.create(dto));
  }

  update(id: number, dto: CreateMaterialDto) {
    return this.materialRepository.update({ id }, dto);
  }

  remove(id: number) {
    return this.materialRepository.delete({ id });
  }

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await this.materialTransactionRepository.save(
      this.materialTransactionRepository.create(dto),
    );

    const action = {
      [MaterialTransactionType.Add]: 'increment',
      [MaterialTransactionType.Substruct]: 'decrement',
    }[Number(dto.type)];

    await this.materialRepository[action](
      { id: dto.materialId },
      'quantity',
      dto.quantity,
    );

    return transaction;
  }

  findAllTransactions() {
    return this.materialTransactionRepository.find();
  }

  findOneTransaction(id: number) {
    return this.materialTransactionRepository.findOne({ where: { id } });
  }
}
