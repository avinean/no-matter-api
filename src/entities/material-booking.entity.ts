import {
  MaterialBookingStatus,
  MaterialTransactionType,
} from 'src/types/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialEntity } from './material.entity';
import { ProfileEntity } from './profile.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'material_booking' })
export class MaterialBookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: MaterialBookingStatus,
    default: MaterialBookingStatus.new,
  })
  status: MaterialBookingStatus;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => BookingEntity, (booking) => booking)
  booking: BookingEntity;
}
