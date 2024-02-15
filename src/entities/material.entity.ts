import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaterialTransactionEntity } from './material-transaction.entity';
import { BusinessObjectEntity } from './business-object.entity';

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
}
