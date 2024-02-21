import {
  Column,
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
import { ProfileEntity } from './profile.entity';
import { ClientEntity } from './client.entity';
import { OrderEntity } from './order.entity';
import { ConfirmationStatus } from 'src/types/enums';
import { BookingServiceEntity } from './booking-service.entity';
import { MaterialTransactionEntity } from './material-transaction.entity';
import { BusinessObjectEntity } from './business-object.entity';

@Entity({ name: 'booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: ConfirmationStatus,
    default: ConfirmationStatus.new,
  })
  status: ConfirmationStatus;

  @Column({ default: '' })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_objects' })
  createdBy: ProfileEntity;

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @ManyToOne(() => BusinessObjectEntity)
  @JoinColumn({ name: 'business_object_id' })
  businessObject: BusinessObjectEntity;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToOne(() => OrderEntity, (order) => order.booking)
  order: OrderEntity;

  @OneToMany(
    () => BookingServiceEntity,
    (bookingService) => bookingService.booking,
  )
  @JoinColumn({ name: 'id' })
  services: BookingServiceEntity[];

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.booking,
  )
  materialTransactions: MaterialTransactionEntity[];
}
