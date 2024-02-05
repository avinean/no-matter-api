import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ClientEntity } from './client.entity';
import { ServiceEntity } from './service.entity';
import { OrderEntity } from './order.entity';

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

  @Column({ default: '' })
  comment: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_booking' })
  profile: ProfileEntity;

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
