import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from './User';

@Entity({ name: 'bussinesses' })
export class BussinessEntity {
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

  @ManyToOne(() => UserProfileEntity)
  @JoinTable({ name: 'profile_bussiness' })
  profile: UserProfileEntity;

  @OneToMany(
    () => BussinessObjectEntity,
    (bussinessObject) => bussinessObject.bussiness,
  )
  @JoinColumn({ name: 'bussiness_to_objects' })
  objects: BussinessObjectEntity[];
}

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

  @ManyToOne(() => UserProfileEntity)
  @JoinTable({ name: 'profile_to_objects' })
  profile: UserProfileEntity;

  @ManyToOne(() => BussinessEntity, (bussiness) => bussiness.objects)
  @JoinTable({ name: 'bussiness_to_objects' })
  bussiness: BussinessEntity;
}
