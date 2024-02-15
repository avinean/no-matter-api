import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'businesses' })
export class BusinessEntity {
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
  @JoinTable({ name: 'profile_business' })
  profile: ProfileEntity;

  @OneToMany(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.business,
  )
  @JoinColumn({ name: 'business_to_objects' })
  objects: BusinessObjectEntity[];

  @OneToMany(() => RoleEntity, (role) => role.business)
  @JoinTable({ name: 'role_business' })
  roles: RoleEntity[];
}
