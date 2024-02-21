import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import {
  SearchProfilesDto,
  SearchServicesDto,
  SearchTimeslotsDto,
} from './booking.dto';
import { BookingEntity } from 'src/entities/booking.entity';
import { BookingServiceService } from '../booking-service/booking-service.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly bookingServicesService: BookingServiceService,
  ) {}

  findAll(where: FindOptionsWhere<BookingEntity>) {
    return this.bookingRepository.find({
      where,
      relations: {
        profile: true,
        client: true,
        services: {
          service: true,
        },
      },
    });
  }

  async create({ services, ...params }: DeepPartial<BookingEntity>) {
    const booking = await this.bookingRepository.save(
      this.bookingRepository.create(params),
    );

    await this.bookingServicesService.update(
      services.map((service) => ({
        ...service,
        booking,
      })),
    );

    return booking;
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
