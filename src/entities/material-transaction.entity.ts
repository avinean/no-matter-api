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
import { MaterialEntity } from './material.entity';
import { ProfileEntity } from './profile.entity';
import { BusinessObjectEntity } from './business-object.entity';

@Entity({ name: 'material_transactions' })
export class MaterialTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MaterialTransactionType,
  })
  type: MaterialTransactionType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.transactions)
  material: MaterialEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.transactions)
  initiator: ProfileEntity;

  @ManyToOne(() => BusinessObjectEntity, (businessObject) => businessObject.id)
  businessObject: BusinessObjectEntity;

  @OneToOne(
    () => MaterialTransactionEntity,
    (revertedTransaction) => revertedTransaction.revertingTransaction,
    { nullable: true },
  )
  @JoinColumn()
  revertedTransaction: MaterialTransactionEntity;

  @OneToOne(
    () => MaterialTransactionEntity,
    (revertingTransaction) => revertingTransaction.revertedTransaction,
    { nullable: true },
  )
  @JoinColumn()
  revertingTransaction: MaterialTransactionEntity;
}
