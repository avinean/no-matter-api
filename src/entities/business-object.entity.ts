import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BusinessEntity } from './business.entity';
import { ClientEntity } from './client.entity';
import { MaterialTransactionEntity } from './material-transaction.entity';

@Entity({ name: 'business_objects' })
export class BusinessObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_objects' })
  profile: ProfileEntity;

  @ManyToOne(() => BusinessEntity, (business) => business.objects)
  @JoinTable({ name: 'business_to_objects' })
  business: BusinessEntity;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_employer' })
  employees: ProfileEntity[];

  @ManyToMany(() => ClientEntity)
  @JoinTable({ name: 'client_business_object' })
  clients: ClientEntity[];

  @OneToMany(() => MaterialTransactionEntity, (transaction) => transaction.id)
  materialTransactions: MaterialTransactionEntity[];
}
