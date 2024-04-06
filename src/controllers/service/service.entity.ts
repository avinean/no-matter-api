import { ServiceType } from 'src/types/enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { BookingEntity } from '../booking/booking.entity';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { OrderEntity } from '../order/order.entity';
import { ServiceMaterialEntity } from '../service-material/service-material.entity';
import { OrderProductsEntity } from '../order-products/order-products.entity';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({ name: 'profile_service' })
  profiles: ProfileEntity[];

  @ManyToMany(() => BusinessObjectEntity)
  @JoinTable({ name: 'business_object_service' })
  relatedBusinessObjects: BusinessObjectEntity[];

  @OneToMany(
    () => ServiceMaterialEntity,
    (serviceMaterial) => serviceMaterial.service,
  )
  @JoinColumn({ name: 'id' })
  spending: ServiceMaterialEntity[];

  @OneToMany(
    () => OrderProductsEntity,
    (serviceMaterial) => serviceMaterial.service,
    { cascade: true },
  )
  booked: OrderProductsEntity[];
}
