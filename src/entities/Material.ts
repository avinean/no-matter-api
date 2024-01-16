import { MaterialTransactionType } from 'src/types/material-transaction';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @OneToMany(
    () => MaterialTransactionEntity,
    (transaction) => transaction.material,
  )
  transactions: MaterialTransactionEntity[];
}

@Entity({ name: 'material_transactions' })
export class MaterialTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  materialId: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MaterialTransactionType,
  })
  type: MaterialTransactionType;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => MaterialEntity, (material) => material.transactions, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'materialId' })
  material: MaterialEntity;
}
