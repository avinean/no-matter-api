import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { SearchTimeslotsDto } from './booking.dto';
import { BookingEntity } from 'src/entities/booking.entity';
import { OrderProductsService } from '../order-products/order-products.service';
import { BookingStatusEntity } from 'src/entities/booking-status.entity';
import { ConfirmationStatus } from 'src/types/enums';
import { OrderService } from '../order/order.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(BookingStatusEntity)
    private readonly bookingStatusRepository: Repository<BookingStatusEntity>,
    private readonly orderProductsService: OrderProductsService,
    private readonly orderService: OrderService,
  ) {}

  findAll(where: FindOptionsWhere<BookingEntity>) {
    return this.bookingRepository.find({
      where,
      relations: {
        profile: true,
        client: true,
        statuses: {
          createdBy: true,
        },
        services: {
          service: true,
        },
      },
    });
  }

  findOne(where: FindOptionsWhere<BookingEntity>) {
    return this.bookingRepository.findOne({
      where,
      relations: {
        profile: true,
        client: true,
        statuses: {
          createdBy: true,
        },
        services: {
          service: true,
        },
      },
    });
  }

  async create(
    { services, ...params }: DeepPartial<BookingEntity>,
    createdBy: ProfileEntity,
  ) {
    const booking = await this.bookingRepository.save(
      this.bookingRepository.create(params),
    );

    await this.bookingStatusRepository.save(
      this.bookingStatusRepository.create({
        booking,
        createdBy,
      }),
    );

    await this.orderProductsService.update(
      services.map((service) => ({
        ...service,
        booking,
      })),
    );

    return booking;
  }

  async update(
    where: FindOptionsWhere<BookingEntity>,
    { services, ...dto }: DeepPartial<BookingEntity>,
    createdBy: ProfileEntity,
  ) {
    const booking = await this.bookingRepository.findOne({ where });
    Object.assign(booking, dto);
    this.bookingRepository.save(booking);

    await this.bookingStatusRepository.save(
      this.bookingStatusRepository.create({
        booking,
        status: ConfirmationStatus.updated,
        createdBy,
      }),
    );

    await this.orderProductsService.update(
      services.map((service) => ({
        ...service,
        booking,
      })),
    );

    return booking;
  }

  async cancel(id: number, createdBy: ProfileEntity) {
    await this.bookingStatusRepository.save(
      this.bookingStatusRepository.create({
        status: ConfirmationStatus.rejected,
        booking: { id },
        createdBy,
      }),
    );
  }

  async confirm(id: number, createdBy: ProfileEntity) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        services: {
          service: true,
        },
      },
    });

    await this.bookingStatusRepository.save(
      this.bookingStatusRepository.create({
        status: ConfirmationStatus.approved,
        booking,
        createdBy,
      }),
    );

    const order = await this.orderService.create({
      createdBy,
      booking,
      businessObject: booking.businessObject,
    });

    await this.orderProductsService.update(
      booking.services.map((service) => ({
        ...service,
        booking,
        order,
      })),
    );

    return this.orderService.findOne({ id: order.id });
  }

  findProfiles(services: ServiceEntity[]) {
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

  findServices({ profile }: Partial<BookingEntity>) {
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
    const { date, duration } = dto;

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
