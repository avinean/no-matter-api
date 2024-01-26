import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity, ProfileEntity } from 'src/entities/Profile';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './profiles.dto';
import { DBErrors } from 'src/types/db-errors';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async findAll() {
    return await this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async create(dto: Partial<CreateProfileDto>) {
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

  update(id: number, dto: Partial<CreateProfileDto>) {
    return this.profileRepository.update({ id }, dto);
  }

  remove(id: number) {
    return this.profileRepository.delete({ id });
  }

  setStatus(id: number, status: boolean) {
    return this.profileRepository.update({ id }, { status });
  }
}
