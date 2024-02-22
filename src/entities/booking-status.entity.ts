import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ConfirmationStatus } from 'src/types/enums';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'booking_status' })
@Unique(['booking', 'status', 'createdBy'])
export class BookingStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => ProfileEntity)
  createdBy: ProfileEntity;

  @ManyToOne(() => BookingEntity, (booking) => booking.statuses)
  booking: BookingEntity;
}
