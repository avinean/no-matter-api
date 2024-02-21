import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from './service.entity';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'booking_service' })
export class BookingServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ServiceEntity, (service) => service.booked)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @ManyToOne(() => BookingEntity, (booking) => booking.services)
  @JoinColumn({ name: 'booking_id' })
  booking: BookingEntity;
}

