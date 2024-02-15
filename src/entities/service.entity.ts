import { ServiceType } from 'src/types/enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BookingEntity } from './booking.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { OrderEntity } from './order.entity';
import { MaterialEntity } from './material.entity';

@Entity({ name: 'services' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'service_type',
    enum: ServiceType,
    type: 'enum',
    default: ServiceType.service,
  })
  type: ServiceType;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: false })
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({ name: 'profile_service' })
  profiles: ProfileEntity[];

  @ManyToMany(() => BookingEntity)
  @JoinTable({ name: 'service_booking' })
  bookings: BookingEntity[];

  @ManyToMany(() => BusinessObjectEntity)
  @JoinTable({ name: 'business_object_service' })
  businessObjects: BusinessObjectEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.products)
  @JoinTable({ name: 'order_product' })
  orders: OrderEntity[];
}
