import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinTable({ name: 'profile_business' })
  owner: ProfileEntity;

  @OneToMany(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.business,
  )
  businessObjects: BusinessObjectEntity[];

  @OneToMany(() => RoleEntity, (role) => role.business)
  @JoinTable({ name: 'role_business' })
  roles: RoleEntity[];
}
