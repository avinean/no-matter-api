import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BusinessEntity } from './business.entity';
import { ClientEntity } from './client.entity';
import { MaterialTransactionEntity } from './material-transaction.entity';
import { MaterialEntity } from './material.entity';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'business_objects' })
export class BusinessObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_objects' })
  createdBy: ProfileEntity;

  @ManyToOne(() => BusinessEntity, (business) => business.businessObjects)
  @JoinTable({ name: 'business_to_objects' })
  business: BusinessEntity;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_employer' })
  employees: ProfileEntity[];

  @ManyToMany(() => ClientEntity)
  @JoinTable({ name: 'client_business_object' })
  customers: ClientEntity[];

  @OneToMany(() => MaterialTransactionEntity, (transaction) => transaction.id)
  materialTransactions: MaterialTransactionEntity[];

  @OneToMany(() => MaterialEntity, (transaction) => transaction.id)
  materials: MaterialEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.businessObject)
  bookings: BookingEntity[];
}
