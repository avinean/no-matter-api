import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity, ClientEntity } from 'src/entities/Client';
import { Repository } from 'typeorm';
import { CreateClientDto } from './clients.dto';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private profileRepository: Repository<ClientEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async findAll() {
    return await this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async create(dto: Partial<CreateClientDto>) {
    try {
      const profile = this.profileRepository.create(dto);
      await this.profileRepository.save(profile);
      return profile;
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

  update(id: number, dto: Partial<CreateClientDto>) {
    return this.profileRepository.update({ id }, dto);
  }

  remove(id: number) {
    return this.profileRepository.delete({ id });
  }

  setStatus(id: number, status: boolean) {
    return this.profileRepository.update({ id }, { status });
  }
}
