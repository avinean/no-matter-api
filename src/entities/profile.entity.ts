import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sex } from 'src/types/enums';
import { ServiceEntity } from './service.entity';
import { BookingEntity } from './booking.entity';
import { BusinessEntity } from './business.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { MaterialTransactionEntity } from './material-transaction.entity';
import { OrderEntity } from './order.entity';
import { ScheduleEntity } from './schedule.entity';
import { CalendarEntity } from './calendar.entity';

@Entity({ name: 'user_profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: true,
  })
  sex: Sex;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'profile_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => ServiceEntity)
  @JoinTable({ name: 'profile_service' })
  services: ServiceEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.profile)
  @JoinColumn({ name: 'profile_booking' })
  bookings: BookingEntity[];

  @OneToMany(() => BusinessEntity, (business) => business.owner)
  @JoinTable({ name: 'profile_business' })
  ownedBusinesses: BusinessEntity[];

  @OneToMany(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.createdBy,
  )
  @JoinTable({ name: 'profile_to_objects' })
  ownedObjects: BusinessObjectEntity[];

  @ManyToMany(() => BusinessObjectEntity)
  @JoinTable({ name: 'profile_to_employer' })
  employers: BusinessObjectEntity[];

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.initiator,
  )
  initiatedMaterialTransactions: MaterialTransactionEntity[];

  @OneToMany(() => OrderEntity, (order) => order.createdBy)
  orders: OrderEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.profile)
  schedule: ScheduleEntity[];

  @OneToMany(() => CalendarEntity, (calendar) => calendar.profile)
  calendar: CalendarEntity[];
}
