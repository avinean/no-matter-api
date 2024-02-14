import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BookingEntity, (booking) => booking.order)
  @JoinTable({ name: 'order_booking' })
  booking: BookingEntity;

  @ManyToMany(() => ServiceEntity, (service) => service.orders)
  @JoinTable({ name: 'order_product' })
  products: ServiceEntity[];
}
