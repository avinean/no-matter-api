import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { ProfileEntity } from './profile.entity';
import { OrderProductsEntity } from './order-products.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { OrderStatusEntity } from './order-status.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderStatusEntity, (status) => status.order)
  statuses: OrderStatusEntity[];

  @OneToOne(() => BookingEntity, (booking) => booking.order)
  @JoinColumn()
  booking: BookingEntity;

  @OneToMany(() => OrderProductsEntity, (orderProduct) => orderProduct.order)
  @JoinTable({ name: 'order_product' })
  services: OrderProductsEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.orders)
  @JoinTable({ name: 'profile_order' })
  createdBy: ProfileEntity;

  @ManyToOne(() => BusinessObjectEntity, (business) => business.orders)
  @JoinTable({ name: 'business_objects_order' })
  businessObject: ProfileEntity;
}
