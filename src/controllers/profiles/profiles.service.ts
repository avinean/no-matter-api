import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity, ProfileEntity } from 'src/entities/Profile';
import { Repository } from 'typeorm';
import { CreateContactDto, CreateProfileDto } from './profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  findAll() {
    return this.profileRepository.find({
      relations: ['contacts'],
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  create(dto: Partial<CreateProfileDto>) {
    return this.profileRepository.save(this.profileRepository.create(dto));
  }

  update(id: number, dto: CreateProfileDto) {
    return this.profileRepository.update({ id }, dto);
  }

  remove(id: number) {
    return this.profileRepository.delete({ id });
  }

  addContacts(profileId: number, contacts: CreateContactDto[]) {
    return this.contactRepository.save(
      contacts.map((contact) => ({ ...contact, profileId })),
    );
  }
}
