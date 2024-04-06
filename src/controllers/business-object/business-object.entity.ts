import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { BusinessEntity } from '../business/business.entity';
import { ClientEntity } from '../client/client.entity';
import { MaterialTransactionEntity } from '../material-transaction/material-transaction.entity';
import { MaterialEntity } from '../material/material.entity';
import { BookingEntity } from '../booking/booking.entity';
import { OrderEntity } from '../order/order.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { CalendarEntity } from '../calendar/calendar.entity';

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

  @ManyToOne(() => BusinessEntity, (business) => business.businessObjects)
  @JoinTable({ name: 'business_to_objects' })
  business: BusinessEntity;

  @ManyToMany(() => ClientEntity)
  @JoinTable({ name: 'client_business_object' })
  customers: ClientEntity[];

  @OneToMany(() => MaterialTransactionEntity, (transaction) => transaction.id)
  materialTransactions: MaterialTransactionEntity[];

  @OneToMany(() => MaterialEntity, (transaction) => transaction.id)
  materials: MaterialEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.businessObject)
  bookings: BookingEntity[];

  @OneToMany(() => OrderEntity, (order) => order.businessObject)
  orders: OrderEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.businessObject)
  schedule: ScheduleEntity[];

  @OneToMany(() => CalendarEntity, (calendar) => calendar.businessObject)
  calendar: CalendarEntity[];
}
