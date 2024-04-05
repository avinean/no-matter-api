import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialTransactionEntity } from 'src/controllers/material-transaction/material-transaction.entity';
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
        previous: true,
        next: true,
        initiator: true,
        booking: true,
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
    const previous = await this.materialTransactionRepository.findOne({
      where,
      relations: {
        material: true,
      },
    });

    const next = await this.materialTransactionRepository.save(
      this.materialTransactionRepository.create({
        ...dto,
        material: previous.material,
        type: MaterialTransactionType.revert,
        previous,
      }),
    );

    this.materialTransactionRepository.update(previous.id, {
      next,
    });

    if (previous.type === MaterialTransactionType.increase) {
      await this.materialService.decrementQuantity(
        previous.material.id,
        previous.quantity,
      );
    } else {
      await this.materialService.incrementQuantity(
        previous.material.id,
        previous.quantity,
      );
    }

    return next;
  }
}
