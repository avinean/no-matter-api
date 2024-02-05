import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BussinessEntity } from './bussiness.entity';

@Entity({ name: 'bussiness_objects' })
export class BussinessObjectEntity {
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

  @ManyToOne(() => BussinessEntity, (bussiness) => bussiness.objects)
  @JoinTable({ name: 'bussiness_to_objects' })
  bussiness: BussinessEntity;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({ name: 'profile_to_employer' })
  employees: ProfileEntity[];
}
