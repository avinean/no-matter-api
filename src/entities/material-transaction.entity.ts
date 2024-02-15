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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.transactions)
  material: MaterialEntity;

  @ManyToOne(
    () => ProfileEntity,
    (profile) => profile.initiatedMaterialTransactions,
  )
  initiator: ProfileEntity;

  @ManyToOne(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.materialTransactions,
  )
  businessObject: BusinessObjectEntity;

  @OneToOne(
    () => MaterialTransactionEntity,
    (revertedTransaction) => revertedTransaction.reverting,
    { nullable: true },
  )
  @JoinColumn()
  reverted: MaterialTransactionEntity;

  @OneToOne(
    () => MaterialTransactionEntity,
    (revertingTransaction) => revertingTransaction.reverted,
    { nullable: true },
  )
  @JoinColumn()
  reverting: MaterialTransactionEntity;
}
