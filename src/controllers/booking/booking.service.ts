import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/Services';
import { UserProfileEntity } from 'src/entities/User';
import { Repository } from 'typeorm';
import {
  CreateBookingDto,
  SearchProfilesDto,
  SearchServicesDto,
  SearchTimeslotsDto,
} from './booking.dto';
import { BookingEntity } from 'src/entities/Booking';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  findAll() {
    return this.bookingRepository.find({
      relations: ['services', 'profile', 'client'],
    });
  }

  async create(dto: CreateBookingDto) {
    return this.bookingRepository.save(this.bookingRepository.create(dto));
  }

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

  async findTimeSlots(dto: SearchTimeslotsDto) {
    const { profile, date, duration } = dto;

    const bookedTimeSlots = await this.bookingRepository
      .createQueryBuilder('booking')
      .select(['booking.date', 'booking.duration'])
      .where('booking.date = :date', { date })
      .getMany();

    const freeTimeSlots = [];

    // If there are no bookings on the given date, return the full day as free
    if (!bookedTimeSlots.length) {
      for (let i = 0; i < 25 - duration; i++) {
        const time = new Date();
        time.setHours(i, 0, 0, 0);
        freeTimeSlots.push(time);
      }

      return freeTimeSlots;
    }

    return freeTimeSlots;
  }
}
