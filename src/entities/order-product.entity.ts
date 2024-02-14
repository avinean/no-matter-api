import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'order_product' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.orders)
  @JoinColumn({ name: 'product_id' })
  product: ServiceEntity;

  @Column()
  quantity: number;
}
