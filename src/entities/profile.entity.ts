import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sex } from 'src/types/enums';
import { ServiceEntity } from './service.entity';
import { BookingEntity } from './booking.entity';
import { BussinessEntity } from './bussiness.entity';
import { BussinessObjectEntity } from './bussiness-object.entity';
import { UserEntity } from './user.entity';

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: 'guest' })
  roles: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => ServiceEntity)
  @JoinTable({ name: 'profile_service' })
  services: ServiceEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.profile)
  @JoinColumn({ name: 'profile_booking' })
  bookings: BookingEntity[];

  @OneToMany(() => BussinessEntity, (bussiness) => bussiness.profile)
  @JoinTable({ name: 'profile_bussiness' })
  bussinesses: BussinessEntity[];

  @OneToMany(
    () => BussinessObjectEntity,
    (bussinessObject) => bussinessObject.profile,
  )
  @JoinTable({ name: 'profile_to_objects' })
  objects: BussinessObjectEntity;

  @ManyToMany(() => BussinessObjectEntity)
  @JoinTable({ name: 'profile_to_employer' })
  employers: BussinessObjectEntity[];
}
