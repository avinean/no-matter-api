import { ConfirmationStatus } from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { MaterialEntity } from './material.entity';

@Entity({ name: 'material_booking' })
export class MaterialBookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: ConfirmationStatus,
    default: ConfirmationStatus.new,
  })
  status: ConfirmationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.bookings)
  material: MaterialEntity;

  @ManyToOne(() => BookingEntity, (booking) => booking)
  booking: BookingEntity;
}
