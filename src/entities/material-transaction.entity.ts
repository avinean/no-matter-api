import { MaterialTransactionType } from 'src/types/enums';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialEntity } from './material.entity';
import { ProfileEntity } from './profile.entity';
import { BussinessObjectEntity } from './bussiness-object.entity';

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.transactions)
  material: MaterialEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  initiator: ProfileEntity;

  @ManyToOne(
    () => BussinessObjectEntity,
    (bussinessObject) => bussinessObject.id,
  )
  bussinessObject: BussinessObjectEntity;

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
