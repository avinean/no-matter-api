import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { BusinessEntity } from '../business/business.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PermissionEntity, { cascade: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  assignedPermissions: PermissionEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.roles)
  @JoinTable({ name: 'profile_roles' })
  assignedProfiles: ProfileEntity[];

  @ManyToOne(() => BusinessEntity)
  @JoinTable({ name: 'role_business' })
  business: BusinessEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}