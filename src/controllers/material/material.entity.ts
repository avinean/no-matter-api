import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaterialTransactionEntity } from '../material-transaction/material-transaction.entity';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { ServiceMaterialEntity } from '../service-material/service-material.entity';

@Entity({ name: 'materials' })
export class MaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @Column({
    default: 0,
  })
  quantity: number;

  @Column({
    default: 0,
  })
  bookedQuantity: number;

  @Column()
  criticalQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.material,
  )
  transactions: MaterialTransactionEntity[];

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.materials,
  )
  businessObject: BusinessObjectEntity;

  @OneToMany(
    () => ServiceMaterialEntity,
    (serviceMaterial) => serviceMaterial.material,
    { cascade: true },
  )
  spending: ServiceMaterialEntity[];
}
