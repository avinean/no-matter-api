import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BusinessObjectEntity } from './business-object.entity';

@Entity({ name: 'schedule' })
@Unique(['dayOfWeek', 'profile', 'businessObject'])
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  start: string;

  @Column({ type: 'time' })
  end: string;

  @Column()
  isWeekend: boolean;

  @Column({
    type: 'enum',
    enum: [1, 2, 3, 4, 5, 6, 0],
  })
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 0;

  @Column({ default: 0 })
  offset: number;

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.schedule,
  )
  businessObject: BusinessObjectEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.schedule)
  profile: ProfileEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
