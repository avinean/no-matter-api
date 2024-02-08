import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity, ClientEntity } from 'src/entities/client.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  findAll(where: FindOptionsWhere<ClientEntity>) {
    return this.clientRepository.find({ where });
  }

  create(dto: DeepPartial<ClientEntity>) {
    try {
      return this.clientRepository.save(this.clientRepository.create(dto));
    } catch (e) {
      if (e.errno === DBErrors.ER_DUP_ENTRY) {
        throw new ConflictException({
          message: `Duplicate contact found: ${e.parameters[1]}`,
          items: e.parameters,
        });
      } else {
        throw e;
      }
    }
  }

  update(
    where: FindOptionsWhere<ClientEntity>,
    dto: DeepPartial<ClientEntity>,
  ) {
    return this.clientRepository.update(where, dto);
  }
}
