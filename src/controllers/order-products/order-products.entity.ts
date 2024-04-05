import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { BookingEntity } from '../booking/booking.entity';
import { OrderEntity } from '../order/order.entity';

@Entity({ name: 'order-products' })
export class OrderProductsEntity {
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

  @ManyToOne(() => OrderEntity, (order) => order.services)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
