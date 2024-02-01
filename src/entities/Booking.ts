import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from './User';
import { ClientEntity } from './Client';
import { ServiceEntity } from './Services';
import { OrderEntity } from './Order';

@Entity({ name: 'booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({ default: false })
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserProfileEntity)
  @JoinTable({ name: 'profile_booking' })
  profile: UserProfileEntity;

  @ManyToMany(() => ServiceEntity)
  @JoinTable({ name: 'service_booking' })
  services: ServiceEntity[];

  @ManyToOne(() => ClientEntity)
  @JoinTable({ name: 'client_booking' })
  client: ClientEntity;

  @OneToOne(() => OrderEntity, (order) => order.id)
  @JoinTable({ name: 'order_booking' })
  order: OrderEntity;
}
