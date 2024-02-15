import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.material,
  )
  transactions: MaterialTransactionEntity[];

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.id,
  )
  businessObject: BusinessObjectEntity;
}
