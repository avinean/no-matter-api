import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialTransactionType } from 'src/types/enums';
import { MaterialEntity } from '../material/material.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { BookingEntity } from '../booking/booking.entity';

@Entity({ name: 'material_transactions' })
export class MaterialTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: MaterialTransactionType,
  })
  type: MaterialTransactionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.transactions)
  material: MaterialEntity;

  @ManyToOne(() => ProfileEntity)
  initiator: ProfileEntity;

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.materialTransactions,
  )
  businessObject: BusinessObjectEntity;

  @OneToOne(() => MaterialTransactionEntity, (prev) => prev.next, {
    nullable: true,
  })
  @JoinColumn()
  previous: MaterialTransactionEntity;

  @OneToOne(() => MaterialTransactionEntity, (next) => next.previous, {
    nullable: true,
  })
  @JoinColumn()
  next: MaterialTransactionEntity;

  @ManyToOne(() => BookingEntity, (booking) => booking.materialTransactions)
  booking: BookingEntity;
}
