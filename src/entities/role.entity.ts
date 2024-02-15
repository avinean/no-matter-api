import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { ProfileEntity } from './profile.entity';
import { BusinessEntity } from './business.entity';

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
  permissions: PermissionEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.roles)
  @JoinTable({ name: 'profile_roles' })
  profiles: ProfileEntity[];

  @ManyToOne(() => BusinessEntity)
  @JoinTable({ name: 'role_business' })
  business: BusinessEntity;
}
