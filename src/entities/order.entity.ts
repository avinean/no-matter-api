import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { ProfileEntity } from './profile.entity';
import { OrderProductsEntity } from './order-products.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BookingEntity, (booking) => booking.order)
  @JoinTable({ name: 'order_booking' })
  booking: BookingEntity;

  @OneToMany(() => OrderProductsEntity, (orderProduct) => orderProduct.order)
  @JoinTable({ name: 'order_product' })
  products: OrderProductsEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.orders)
  @JoinTable({ name: 'profile_order' })
  createdBy: ProfileEntity;
}
