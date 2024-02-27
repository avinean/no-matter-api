import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { DayType } from 'src/types/enums';

@Entity({ name: 'calendar' })
export class CalendarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DayType,
  })
  type: string;

  @Column()
  comment: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @Column({ type: 'time', nullable: true })
  start: string;

  @Column({ type: 'time', nullable: true })
  end: string;

  @Column({ default: 0 })
  offset: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.calendar,
  )
  businessObject: BusinessObjectEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.calendar)
  profile: ProfileEntity;
}
