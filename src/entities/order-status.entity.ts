import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { OrderStatus } from 'src/types/enums';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_status' })
export class OrderStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.new,
  })
  status: OrderStatus;

  @Column({ default: '' })
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => ProfileEntity)
  createdBy: ProfileEntity;

  @ManyToOne(() => OrderEntity, (order) => order.statuses)
  order: OrderEntity;
}
