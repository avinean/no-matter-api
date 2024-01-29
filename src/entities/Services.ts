import { ServiceType } from 'src/types/enums';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'services' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'service_type',
    enum: ServiceType,
    type: 'enum',
    default: ServiceType.service,
  })
  type: ServiceType;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: false })
  status: boolean;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;
}
