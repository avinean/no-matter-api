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
  OneToOne,
} from 'typeorm';
import { Sex } from 'src/types/enums';
import { ServiceEntity } from '../service/service.entity';
import { BusinessEntity } from '../business/business.entity';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { CalendarEntity } from '../calendar/calendar.entity';

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

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  language: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.primaryProfile)
  @JoinColumn()
  primaryFor: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'profile_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => ServiceEntity)
  @JoinTable({ name: 'profile_service' })
  services: ServiceEntity[];

  @ManyToMany(() => BusinessEntity)
  @JoinTable()
  businesses: BusinessEntity[];

  @ManyToOne(() => BusinessEntity)
  @JoinColumn()
  primaryBusiness: BusinessEntity;

  @ManyToOne(() => BusinessObjectEntity)
  @JoinColumn()
  primaryBusinessObject: BusinessObjectEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.profile)
  schedule: ScheduleEntity[];

  @OneToMany(() => CalendarEntity, (calendar) => calendar.profile)
  calendar: CalendarEntity[];
}
