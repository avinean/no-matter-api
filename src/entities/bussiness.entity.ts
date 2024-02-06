import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BussinessObjectEntity } from './bussiness-object.entity';
import { RoleEntity } from './role.entity';

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

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_bussiness' })
  profile: ProfileEntity;

  @OneToMany(
    () => BussinessObjectEntity,
    (bussinessObject) => bussinessObject.bussiness,
  )
  @JoinColumn({ name: 'bussiness_to_objects' })
  objects: BussinessObjectEntity[];

  @OneToMany(() => RoleEntity, (role) => role.bussiness)
  @JoinTable({ name: 'role_bussiness' })
  roles: RoleEntity[];
}
