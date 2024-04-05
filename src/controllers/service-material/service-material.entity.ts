import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { MaterialEntity } from '../material/material.entity';

@Entity({ name: 'service_materials' })
@Unique(['service', 'material'])
export class ServiceMaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ServiceEntity, (service) => service.spending)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @ManyToOne(() => MaterialEntity, (material) => material.spending)
  @JoinColumn({ name: 'material_id' })
  material: MaterialEntity;
}
