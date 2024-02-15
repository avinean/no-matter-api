import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialTransactionEntity } from 'src/entities/material-transaction.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { MaterialService } from '../material/material.service';
import { MaterialTransactionType } from 'src/types/enums';

@Injectable()
export class MaterialTransactionService {
  constructor(
    @InjectRepository(MaterialTransactionEntity)
    private readonly materialTransactionRepository: Repository<MaterialTransactionEntity>,
    private readonly materialService: MaterialService,
  ) {}

  findAll(where: FindOptionsWhere<MaterialTransactionEntity>) {
    return this.materialTransactionRepository.find({
      where,
      relations: {
        reverted: true,
        reverting: true,
        initiator: true,
      },
    });
  }

  findOne(where: FindOptionsWhere<MaterialTransactionEntity>) {
    return this.materialTransactionRepository.findOne({ where });
  }

  async add(dto: DeepPartial<MaterialTransactionEntity>) {
    const transaction = await this.materialTransactionRepository.save(
      this.materialTransactionRepository.create({
        ...dto,
        type: MaterialTransactionType.increase,
      }),
    );

    this.materialService.incrementQuantity(
      dto.material.id,
      transaction.quantity,
    );

    return transaction;
  }

  async revert(
    where: FindOptionsWhere<MaterialTransactionEntity>,
    dto: DeepPartial<MaterialTransactionEntity>,
  ) {
    const reverted = await this.materialTransactionRepository.findOne({
      where,
      relations: {
        material: true,
      },
    });

    const reverting = await this.materialTransactionRepository.save(
      this.materialTransactionRepository.create({
        ...dto,
        quantity: 10,
        material: reverted.material,
        type: MaterialTransactionType.revert,
        reverted,
      }),
    );

    this.materialTransactionRepository.update(reverted.id, {
      reverting,
    });

    if (reverted.type === MaterialTransactionType.increase) {
      await this.materialService.decrementQuantity(
        reverted.material.id,
        reverted.quantity,
      );
    } else {
      await this.materialService.incrementQuantity(
        reverted.material.id,
        reverted.quantity,
      );
    }

    return reverting;
  }
}
