import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity, ProfileEntity } from 'src/entities/Profile';
import { EntityManager, Repository } from 'typeorm';
import { CreateContactDto, CreateProfileDto } from './profiles.dto';
import { ContactType } from 'src/types/enums';

function mapContactsToProfile(profile: ProfileEntity) {
  const { contacts, ...rest } = profile;
  return {
    ...rest,
    emails: contacts
      .filter((contact) => contact.type === ContactType.Email)
      .map(({ type, value, id }) => ({ type, value, id })),
    phones: contacts
      .filter((contact) => contact.type === ContactType.Phone)
      .map(({ type, value, id }) => ({ type, value, id })),
  };
}

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    private entityManager: EntityManager,
  ) {}

  async findAll() {
    return (
      await this.profileRepository.find({
        relations: ['contacts'],
      })
    ).map(mapContactsToProfile);
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async create({ emails, phones, ...dto }: Partial<CreateProfileDto>) {
    const profile = this.profileRepository.create(dto);
    const contacts = this.contactRepository.create([
      ...emails.map((email) => ({ type: ContactType.Email, value: email })),
      ...phones.map((phone) => ({ type: ContactType.Phone, value: phone })),
    ]);
    profile.contacts = contacts;
    contacts.forEach((contact) => (contact.profile = profile));

    await this.profileRepository.save(profile);
    await this.contactRepository.save(contacts);

    return mapContactsToProfile(profile);
  }

  update(id: number, dto: Partial<CreateProfileDto>) {
    return this.entityManager.transaction(async (entityManager) => {
      const existingProfile = await entityManager.findOne(ProfileEntity, {
        where: { id },
        relations: ['contacts'],
      });

      if (!existingProfile) {
        throw new NotFoundException(`Profile with id ${id} not found`);
      }

      // Update profile data
      entityManager.merge(ProfileEntity, existingProfile, dto);
      const updatedProfile = await entityManager.save(existingProfile);

      // Update contacts
      const updatedContacts = dto.emails
        .map((email) => ({
          type: ContactType.Email,
          value: email,
        }))
        .concat(
          dto.phones.map((phone) => ({
            type: ContactType.Phone,
            value: phone,
          })),
        )
        .map((newContact) => {
          const existingContact = existingProfile.contacts.find(
            (contact) =>
              contact.type === newContact.type &&
              contact.value === newContact.value,
          );

          if (existingContact) {
            // If contact is present in DB and DTO, leave it as it is
            return existingContact;
          } else {
            // If contact is absent in DB but present in DTO, add it
            const contact = this.contactRepository.create(newContact);
            contact.profile = updatedProfile;
            return contact;
          }
        });

      existingProfile.contacts.forEach((existingContact) => {
        const contactExistsInDto = updatedContacts.some(
          (contact) =>
            contact.type === existingContact.type &&
            contact.value === existingContact.value,
        );

        if (!contactExistsInDto) {
          // If contact is present in DB but absent in DTO, remove it
          entityManager.remove(existingContact);
        }
      });

      // Save updated contacts
      await entityManager.save(updatedContacts);

      updatedProfile.contacts = updatedContacts;

      return mapContactsToProfile(updatedProfile);
    });
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
