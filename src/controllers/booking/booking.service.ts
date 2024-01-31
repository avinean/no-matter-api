import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/Services';
import { UserProfileEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import { SearchProfilesDto, SearchServicesDto } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
  ) {}

  findProfiles({ services }: SearchProfilesDto) {
    const serviceIds = services.map((service) => service.id);

    // If serviceIds is empty, return an empty array
    if (!serviceIds.length) {
      return this.profileRepository.find();
    }

    return this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.services', 'service')
      .where('service.id IN (:...serviceIds)', { serviceIds })
      .getMany();
  }

  findServices({ profile }: SearchServicesDto) {
    if (!profile) {
      return this.servicesRepository.find();
    }

    return this.servicesRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.profiles', 'profile')
      .where('profile.id = :id', profile)
      .getMany();
  }
}
