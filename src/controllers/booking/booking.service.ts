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

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(startDate.getHours() + 23, 59, 59, 999);

    const bookedTimeSlots = await this.bookingRepository
      .createQueryBuilder('booking')
      .select(['booking.comment', 'booking.date', 'booking.duration'])
      .where('booking.date >= :startDate', { startDate })
      .andWhere('booking.date <= :endDate', { endDate })
      .getMany();

    const freeTimeSlots: { time: string; booked?: BookingEntity }[] = [];
    // 9am to 6pm
    // default values
    // these values will be taken from personal employee's settings
    // or from company settings
    for (let i = 9; i < 20 - duration; i++) {
      const time = new Date();
      time.setHours(i, 0, 0, 0);
      freeTimeSlots.push({ time: time.toISOString() });
    }

    if (!bookedTimeSlots.length) return freeTimeSlots;

    bookedTimeSlots.forEach((_) => {
      for (let i = 0; i < _.duration; i++) {
        const time = new Date(_.date);
        time.setHours(time.getHours() + i);

        const slot = freeTimeSlots.find((__) => {
          return __.time === time.toISOString();
        });

        if (slot) slot.booked = _;
      }
    });

    return freeTimeSlots;
  }
}
