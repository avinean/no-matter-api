import { Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookingEntity } from './Booking';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BookingEntity, (booking) => booking.id)
  @JoinTable({ name: 'order_booking' })
  order: BookingEntity;
}
