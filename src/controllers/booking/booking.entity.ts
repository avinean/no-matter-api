import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { ClientEntity } from '../client/client.entity';
import { OrderEntity } from '../order/order.entity';
import { OrderProductsEntity } from '../order-products/order-products.entity';
import { MaterialTransactionEntity } from '../material-transaction/material-transaction.entity';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { BookingStatusEntity } from './booking-status.entity';

@Entity({ name: 'booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({ default: '' })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => BusinessObjectEntity)
  @JoinColumn({ name: 'business_object_id' })
  businessObject: BusinessObjectEntity;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @OneToOne(() => OrderEntity, (order) => order.booking)
  @JoinColumn()
  order: OrderEntity;

  @OneToMany(
    () => OrderProductsEntity,
    (bookingService) => bookingService.booking,
  )
  @JoinColumn({ name: 'id' })
  services: OrderProductsEntity[];

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.booking,
  )
  materialTransactions: MaterialTransactionEntity[];

  @OneToMany(() => BookingStatusEntity, (status) => status.booking)
  statuses: BookingStatusEntity[];
}
